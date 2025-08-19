<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\City;
use App\Models\Amenity;
use App\Models\Category;

class ImportAirbnbListings extends Command
{
    protected $signature = 'import:airbnb {path : Path to airbnb_listings.js/.json} {--limit=0}';
    protected $description = 'Import/Upsert Airbnb listings JSON into properties, images, amenities, categories';

    public function handle()
    {
        $path = $this->argument('path');
        if (!File::exists($path)) {
            $this->error("File not found: {$path}");
            return static::FAILURE;
        }

        $raw = File::get($path);
        $items = $this->toJsonArray($raw);
        if (!is_array($items)) {
            $this->error('Could not parse JSON. Ensure the file contains a valid JSON array.');
            return static::FAILURE;
        }

        $limit = (int)$this->option('limit');
        if ($limit > 0) $items = array_slice($items, 0, $limit);

        $count = 0;
        foreach ($items as $it) {
            try {
                DB::transaction(function () use ($it, &$count) {
                    $this->importOne($it);
                    $count++;
                }, 3);
            } catch (\Throwable $e) {
                $this->warn("Skipped 1 item: " . $e->getMessage());
            }
        }

        $this->info("Imported/updated {$count} listings.");
        return static::SUCCESS;
    }

    /* ================= per-item ================= */

    protected function importOne(array $it): void
    {
        // Stable external id
        $externalId = $it['id'] ?? $it['airbnb_id'] ?? $it['external_id'] ?? null;
        if (!$externalId && !empty($it['url'])) {
            $externalId = $this->tailFromUrl($it['url']);
        }
        $externalId = $externalId ? (string)$externalId : null;

        // City resolve (lazy create)
        $cityName = $this->firstNonEmpty($it, ['city','location.city','address.city','neighbourhood','neighborhood']);
        $country  = $this->firstNonEmpty($it, ['country','location.country','address.country']);
        $region   = $this->firstNonEmpty($it, ['state','region','address.state']);
        $lat      = $this->firstNumber($it, ['lat','latitude','coordinates.lat','location.lat']);
        $lng      = $this->firstNumber($it, ['lng','longitude','coordinates.lng','location.lng']);
        $cityId   = $this->upsertCity($cityName, $country, $region, $lat, $lng);

        // Core fields
        $title = trim($this->firstNonEmpty($it, ['title','name']) ?? 'Untitled');
        $desc  = $this->firstNonEmpty($it, ['description','summary','details']) ?? '';
        $slug  = $this->buildUniqueSlug($title, $externalId);

        // Price
        $priceNight = $this->firstNumber($it, ['price_per_night','night_price','price.nightly','pricePerNight','price_per_night_eur']);
        $priceMonth = $this->firstNumber($it, ['price_per_month','monthly_price','price.monthly']);
        $currency   = $this->firstNonEmpty($it, ['currency','price.currency']) ?? 'EUR';

        // Specs
        $bedrooms  = (int)($this->firstNumber($it, ['bedrooms','bedrooms_count']) ?? 0);
        $bathrooms = (int)($this->firstNumber($it, ['bathrooms','baths_count']) ?? 0);
        $guests    = (int)($this->firstNumber($it, ['max_guests','guests','accommodates','maxGuests']) ?? 2);
        $address   = $this->firstNonEmpty($it, ['address','address_line','location.address']);

        // Upsert by (listing_source, external_id) if available; else by slug
        $lookup = $externalId
            ? ['listing_source' => 'airbnb', 'external_id' => $externalId]
            : ['slug' => $slug];

        $property = Property::updateOrCreate($lookup, [
            'owner_id'        => $property->owner_id ?? null ?? null, // keep/null
            'city_id'         => $cityId,
            'title'           => $title,
            'slug'            => $slug,
            'description'     => $desc,
            'address_line'    => $address,
            'lat'             => $lat,
            'lng'             => $lng,
            'bedrooms'        => $bedrooms,
            'bathrooms'       => $bathrooms,
            'max_guests'      => $guests,
            'currency'        => $currency,
            'price_per_night' => $priceNight,
            'price_per_month' => $priceMonth,
            'status'          => 'published',
            'is_featured'     => (bool)($it['is_featured'] ?? false),
            'listing_source'  => 'airbnb',
            'external_id'     => $externalId,
        ]);

        // Replace images (ordered)
        // Replace images (ordered)
$images = $this->normalizeImages($it);
if ($images) {
    // Wipe old
    PropertyImage::where('property_id', $property->id)->delete();

    // Detect available cols
    $imgCols = \Schema::getColumnListing('property_images');
    $hasCaption   = in_array('caption', $imgCols, true);
    $hasSortOrder = in_array('sort_order', $imgCols, true);
    $hasPosition  = in_array('position', $imgCols, true);

    $insert = [];
    $seen = [];
    $i = 0;

    foreach ($images as $url) {
        $u = trim((string)$url);
        if ($u === '' || isset($seen[$u])) continue;
        $seen[$u] = true;

        $row = [
            'property_id' => $property->id,
            'url'         => $u,
            'created_at'  => now(),
            'updated_at'  => now(),
        ];

        if ($hasCaption)   { $row['caption'] = null; }
        if ($hasSortOrder) { $row['sort_order'] = $i; }
        if ($hasPosition)  { $row['position']   = $i; }

        $insert[] = $row;
        $i++;
    }

    if ($insert) {
        DB::table('property_images')->insert($insert);
    }
}


        // Attach amenities / categories
        $this->syncAmenities($property, $this->extractAmenities($it));
        $this->syncCategories($property, $this->extractCategories($it));
    }

    /* ================= helpers ================= */

    protected function toJsonArray(string $raw): ?array
    {
        $s = trim($raw);
        // direct JSON array
        if (strlen($s) && $s[0] === '[') {
            $d = json_decode($s, true);
            return is_array($d) ? $d : null;
        }
        // NDJSON
        if (strlen($s) && $s[0] === '{') {
            $arr = [];
            foreach (preg_split('/\R/', $raw) as $line) {
                $line = trim($line);
                if ($line === '') continue;
                $obj = json_decode($line, true);
                if (is_array($obj)) $arr[] = $obj;
            }
            if ($arr) return $arr;
            $obj = json_decode($s, true);
            return is_array($obj) ? [$obj] : null;
        }
        // common JS exports
        $s = preg_replace('/^export\s+default\s+/i', '', $s);
        $s = preg_replace('/^module\.exports\s*=\s*/i', '', $s);
        $s = preg_replace('/;?\s*$/', '', $s);
        $d = json_decode($s, true);
        return is_array($d) ? $d : null;
    }

    protected function firstNonEmpty(array $it, array $keys): ?string
    {
        foreach ($keys as $k) {
            $v = $this->dotGet($it, $k);
            if (isset($v) && $v !== '') return is_string($v) ? $v : (is_scalar($v) ? (string)$v : null);
        }
        return null;
    }

    protected function firstNumber(array $it, array $keys): ?float
    {
        foreach ($keys as $k) {
            $v = $this->dotGet($it, $k);
            if ($v === 0 || $v === '0' || is_numeric($v)) return (float)$v;
        }
        return null;
    }

    protected function dotGet($arr, string $key)
    {
        $p = explode('.', $key);
        foreach ($p as $seg) {
            if (is_array($arr) && array_key_exists($seg, $arr)) $arr = $arr[$seg];
            else return null;
        }
        return $arr;
    }

    protected function buildUniqueSlug(string $title, ?string $externalId): string
    {
        $base = Str::slug($title . ($externalId ? "-{$externalId}" : ''));
        $slug = $base ?: Str::random(8);
        $i = 1;
        while (Property::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }
        return $slug;
    }

    protected function tailFromUrl(string $url): ?string
    {
        $path = parse_url($url, PHP_URL_PATH);
        if (!$path) return null;
        $tail = trim($path, '/');
        $parts = explode('/', $tail);
        return end($parts) ?: null;
    }

    protected function upsertCity(?string $name, ?string $country, ?string $region, ?float $lat, ?float $lng): ?int
    {
        if (!$name) return null;
        $city = City::firstOrCreate(
            ['name' => $name, 'country' => $country ?? null, 'region' => $region ?? null],
            ['lat' => $lat, 'lng' => $lng]
        );
        $dirty = false;
        if ($lat && !$city->lat) { $city->lat = $lat; $dirty = true; }
        if ($lng && !$city->lng) { $city->lng = $lng; $dirty = true; }
        if ($dirty) $city->save();
        return $city->id;
    }

    protected function normalizeImages(array $it): array
    {
        $imgs = $this->dotGet($it, 'photos') ?? $this->dotGet($it, 'images') ?? [];
        if (!is_array($imgs)) $imgs = [];

        $urls = [];
        foreach ($imgs as $val) {
            if (is_string($val)) { $urls[] = $val; continue; }
            if (is_array($val)) {
                $u = $val['original'] ?? $val['image'] ?? $val['large'] ?? $val['url'] ?? $val['medium'] ?? $val['small'] ?? null;
                if ($u) $urls[] = $u;
            }
        }
        foreach (['image','cover','thumbnail'] as $k) {
            $u = $this->dotGet($it, $k);
            if (is_string($u)) $urls[] = $u;
        }

        // Clean + dedupe
        $urls = array_values(array_unique(array_filter(array_map('trim', $urls))));
        // Optional: skip obvious non-photos
        $urls = array_values(array_filter($urls, function ($u) {
            if (stripos($u, 'AirbnbPlatformAssets-search-bar-icons') !== false) return false;
            return (bool)preg_match('#\.(jpe?g|png|webp)(\?|$)#i', $u) || stripos($u, 'a0.muscache.com') !== false;
        }));
        return $urls;
    }

    protected function extractAmenities(array $it): array
    {
        $raw = $this->dotGet($it, 'amenities') ?? [];
        $out = [];
        if (is_array($raw)) {
            foreach ($raw as $a) {
                if (is_string($a)) $out[] = $a;
                elseif (is_array($a) && !empty($a['name'])) $out[] = (string)$a['name'];
            }
        }
        return $out;
    }

    protected function extractCategories(array $it): array
    {
        $names = [];
        foreach (['categories','tags','labels'] as $k) {
            $arr = $this->dotGet($it, $k);
            if (!is_array($arr)) continue;
            foreach ($arr as $v) {
                if (is_string($v)) $names[] = $v;
                elseif (is_array($v) && !empty($v['name'])) $names[] = (string)$v['name'];
            }
        }
        return $names;
    }

    protected function syncAmenities(Property $property, array $names): void
    {
        if (!$names) return;
        $ids = [];
        foreach ($names as $name) {
            $n = trim($name);
            if ($n === '') continue;
            $ids[] = Amenity::firstOrCreate(['name' => $n])->id;
        }
        if ($ids) $property->amenities()->syncWithoutDetaching($ids);
    }

    protected function syncCategories(Property $property, array $names): void
    {
        if (!$names) return;
        $ids = [];
        foreach ($names as $name) {
            $n = trim($name);
            if ($n === '') continue;
            $ids[] = Category::firstOrCreate(
                ['slug' => Str::slug($n)],
                ['name' => $n, 'description' => null]
            )->id;
        }
        if ($ids) $property->categories()->syncWithoutDetaching($ids);
    }
}
