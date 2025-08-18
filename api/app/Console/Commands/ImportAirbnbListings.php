<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\DB;

class ImportAirbnbListings extends Command
{
    protected $signature = 'import:airbnb {path : Path to airbnb_listings.js/.json} {--limit=0}';
    protected $description = 'Import/Upsert Airbnb listings JSON into properties & property_images';

    public function handle()
    {
        $path = $this->argument('path');
        if (!File::exists($path)) {
            $this->error("File not found: {$path}");
            return static::FAILURE;
        }

        // Handle .js that contains a JS array or one-object-per-line; try to extract JSON
        $raw = File::get($path);
        $json = $this->toJsonArray($raw);
        if (!is_array($json)) {
            $this->error('Could not parse JSON. Ensure the file contains a valid JSON array.');
            return static::FAILURE;
        }

        $limit = (int)$this->option('limit');
        $count = 0;

        DB::transaction(function () use ($json, $limit, &$count) {
            foreach ($json as $item) {
                if ($limit && $count >= $limit) break;

                // --- Map core fields ---
                $extId   = (string)($item['id'] ?? '');
                $title   = trim((string)($item['title'] ?? ''));
                $city    = $this->guessCity($item);
                $lat     = $item['latitude']  ?? null;
                $lng     = $item['longitude'] ?? null;

                // Normalize price_per_night (ignore "Add dates for prices")
                $ppn = $item['pricePerNight'] ?? null;
                $pricePerNight = (is_numeric($ppn) ? (int)$ppn : null);

                // Upsert property by external id in raw OR slug+source
                $property = Property::query()
                    ->where('listing_source', 'airbnb')
                    ->where('raw->id', $extId) // requires MySQL 5.7+/JSON
                    ->first();

                if (!$property) {
                    // Try matching by title if you already have titles seeded
                    $property = Property::query()
                        ->where('listing_source', 'airbnb')
                        ->where('title', $title)
                        ->first();
                }

                if (!$property) {
                    $property = new Property();
                    $property->listing_source = 'airbnb';
                    $property->status = 'published';
                }

                $property->title = $title ?: $property->title;
                $property->slug  = $property->slug ?: Str::slug($title).'-'.$extId;
                $property->summary = $property->summary ?: null;
                $property->description = $property->description ?: null;

                // If you have cities table, set city_id via your own resolver; else store name in raw
                $property->city_id = $property->city_id ?: null;

                // Coordinates (if null in feed, keep existing)
                if (!is_null($lat)) $property->lat = $lat;
                if (!is_null($lng)) $property->lng = $lng;

                // Bedrooms/Beds/Baths/Guests
                $property->bedrooms       = $property->bedrooms       ?? ($item['bedrooms'] ?? null);
                $property->beds           = $property->beds           ?? ($item['beds'] ?? null);
                $property->bathrooms      = $property->bathrooms      ?? ($item['bathrooms'] ?? null);
                $property->max_guests     = $property->max_guests     ?? ($item['maxGuests'] ?? null);
                $property->price_per_night = $pricePerNight;

                // Keep whole raw item for future mapping/debug
                $property->raw = $item;

                $property->save();

                // --- Images: wipe & insert fresh photos[] for this property ---
                $photos = array_values(array_filter(array_unique(array_map('strval', $this->filterPhotos($item['photos'] ?? [])))));
                if (!empty($photos)) {
                    // optional: keep existing if you prefer; here we refresh
                    PropertyImage::where('property_id', $property->id)->delete();

                    foreach ($photos as $i => $url) {
                        PropertyImage::create([
                            'property_id' => $property->id,
                            'url'         => $url,
                            'position'    => $i,
                        ]);
                    }
                }

                $count++;
            }
        });

        $this->info("Imported/updated {$count} listings.");
        return static::SUCCESS;
    }

    /** Try to coerce .js content to a JSON array string and decode */
    protected function toJsonArray(string $raw)
    {
        $trim = trim($raw);

        // If it starts with [ ... ] assume it's a JSON array
        if (strlen($trim) && $trim[0] === '[') {
            $data = json_decode($trim, true);
            return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
        }

        // If it starts with { ... } assume it's a single object or many concatenated; wrap into array
        if (strlen($trim) && $trim[0] === '{') {
            // Some .js dump may be newline-delimited JSON (NDJSON)
            $lines = preg_split('/\r\n|\r|\n/', $raw);
            $arr   = [];
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '') continue;
                $obj = json_decode($line, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($obj)) {
                    $arr[] = $obj;
                }
            }
            if ($arr) return $arr;

            // Else try a single object
            $obj = json_decode($trim, true);
            return (json_last_error() === JSON_ERROR_NONE && is_array($obj)) ? [$obj] : null;
        }

        // If file is "const listings = [...]" try to extract the array literal
        if (preg_match('/\[\s*{.*}\s*]/s', $raw, $m)) {
            $data = json_decode($m[0], true);
            return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
        }

        return null;
    }

    /** Drop platform icons / dupes; keep only real photos */
    protected function filterPhotos(array $photos): array
    {
        return array_filter($photos, function ($u) {
            if (!is_string($u)) return false;
            $u = trim($u);
            if ($u === '') return false;

            // Skip the small Airbnb UI icon (im_w=240 search icon)
            if (strpos($u, 'AirbnbPlatformAssets-search-bar-icons') !== false) return false;

            // Basic image suffix or muscache domain check
            if (preg_match('#\.(jpe?g|png|webp)(\?|$)#i', $u)) return true;
            if (strpos($u, 'a0.muscache.com') !== false) return true;

            return false;
        });
    }

    /** Simple city guesser: prefer explicit fields, then amenities noise-filter (optional) */
    protected function guessCity(array $item): ?string
    {
        if (!empty($item['city'])) return $item['city'];
        // Some scrapes put city names into the "amenities" blob; try to pick Istanbul, etc.
        if (!empty($item['amenities']) && is_array($item['amenities'])) {
            foreach ($item['amenities'] as $a) {
                if (!is_string($a)) continue;
                $a = trim($a);
                if (preg_match('/^(Istanbul|İstanbul|Kadıköy|Şişli|Beşiktaş|Beyoğlu|Bakırköy)$/iu', $a)) {
                    return $a;
                }
            }
        }
        return null;
        // You can extend: parse from URL or keep it null and geocode later.
    }
}
