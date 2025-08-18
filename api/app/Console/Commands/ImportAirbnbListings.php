<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Schema;

use App\Models\{City, Property, PropertyImage, Amenity, Category};
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ImportAirbnbListings extends Command
{
    protected $signature = 'import:airbnb {path=storage/app/seed/airbnb_listings.json}';
    protected $description = 'Import Airbnb listings from JSON';

    public function handle(): int
    {
        $argPath = $this->argument('path');

        // Resolve path: allow absolute Windows paths AND relative project paths
        if (preg_match('/^[A-Za-z]:\\\\/', $argPath) || str_starts_with($argPath, '/')) {
            $path = $argPath; // absolute
        } else {
            // tip: for your default "storage/app/seed/..." a clearer choice is storage_path()
            $path = str_starts_with($argPath, 'storage/')
                ? base_path($argPath)
                : storage_path('app/seed/airbnb_listings.json');
        }

        if (!file_exists($path)) {
            $this->error("File not found: $path");
            return self::FAILURE;
        }

        $items = json_decode(file_get_contents($path), true);
        if (!is_array($items)) {
            $this->error('JSON could not be decoded or is not an array.');
            return self::FAILURE;
        }

        $bar = $this->output->createProgressBar(count($items));
        $bar->start();

        $count = 0; $errors = 0;

        foreach ($items as $it) {
            try {
                $city = City::firstOrCreate([
                    'name'    => $it['city'] ?? 'Istanbul',
                    'region'  => $it['region'] ?? null,
                    'country' => $it['country'] ?? 'Turkey',
                ]);

              

        // inside the loop
        $externalId = $it['id'] ?? ($it['url'] ?? null); // fallback to URL if no numeric id

        
        // build a stable slug that won’t change between runs
        $base = Str::slug(($it['title'] ?? 'property').'-'.($it['id'] ?? Str::slug(parse_url($it['url'] ?? '', PHP_URL_PATH) ?? 'x')));
        $slug = $base; $i = 1;
        while (Property::where('slug', $slug)->exists()) { $slug = "{$base}-{$i}"; $i++; }

        // Use external_id only if column exists
        $hasExternalId = Schema::hasColumn('properties', 'external_id');

        $lookup = ($hasExternalId && $externalId)
            ? ['listing_source' => 'airbnb', 'external_id' => (string)$externalId]
            : ['slug' => $slug];

        $p = Property::updateOrCreate(
            $lookup,
            [
                'slug'             => $slug,
                'city_id'          => $city->id,
                'title'            => $it['title'] ?? 'Untitled',
                'summary'          => $it['summary'] ?? null,
                'description'      => $it['description'] ?? null,
                'address'          => $it['address'] ?? null,
                'lat'              => $it['lat'] ?? null,
                'lng'              => $it['lng'] ?? null,
                'bedrooms'         => $it['bedrooms'] ?? null,
                'beds'             => $it['beds'] ?? null,
                'bathrooms'        => $it['bathrooms'] ?? null,
                'max_guests'       => $it['guests'] ?? null,
                'price_per_night'  => $it['price'] ?? null,
                'is_featured'      => (bool)($it['is_featured'] ?? false),
                'listing_source'   => 'airbnb',
                'status'           => 'published',
                'raw'              => $it,
            ]
        );


                foreach (($it['images'] ?? []) as $pos => $url) {
                    PropertyImage::firstOrCreate([
                        'property_id' => $p->id,
                        'url'         => $url,
                        'position'    => $pos,
                    ]);
                }

                foreach (($it['amenities'] ?? []) as $name) {
                    $amen = Amenity::firstOrCreate(['name' => trim($name)]);
                    $p->amenities()->syncWithoutDetaching([$amen->id]);
                }

                foreach (($it['categories'] ?? []) as $name) {
                    $cslug = Str::slug($name);
                    $cat   = Category::firstOrCreate(['slug' => $cslug], ['name' => $name]);
                    $p->categories()->syncWithoutDetaching([$cat->id]);
                }

                $count++;
            } catch (\Throwable $e) {
                $errors++;
                $this->warn("Error on item ".($count+$errors).": ".$e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish(); $this->newLine();
        $this->info("Imported $count listings. Errors: $errors");

        return self::SUCCESS;
    }

}
