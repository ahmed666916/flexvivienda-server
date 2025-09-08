<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\Amenity;
use Illuminate\Support\Facades\DB;

class ImportAirbnbListings extends Command
{
    protected $signature = 'import:airbnb-listings {file?}';
    protected $description = 'Import Airbnb listings (with local images and amenities) from JSON';

    public function handle()
    {
        $file = $this->argument('file') ?? storage_path('app/airbnb_listings_updated.json');

        if (!file_exists($file)) {
            $this->error("❌ File not found: $file");
            return 1;
        }

        $listings = json_decode(file_get_contents($file), true);

        if (!$listings || !is_array($listings)) {
            $this->error("❌ Invalid JSON structure");
            return 1;
        }

        $count = 0;

        DB::beginTransaction();
        try {
            foreach ($listings as $listing) {
                if (empty($listing['id'])) {
                    $this->warn("Skipping property with missing ID");
                    continue;
                }

                // property id folder for images
                $propertyId = $listing['id'];
                $propertyImageDir = "properties/{$propertyId}";

                // ✅ Insert/update property
                $property = Property::updateOrCreate(
                    ['external_id' => $propertyId],
                    [
                        'title'          => $listing['title'] ?? 'Untitled',
                        'location'       => $listing['location'] ?? 'Istanbul, Turkey',
                        'price_per_day'  => $listing['price'] ?? 0,
                        'bedrooms'       => $listing['bedrooms'] ?? 0,
                        'bathrooms'      => $listing['bathrooms'] ?? 0,
                        'persons'        => $listing['persons'] ?? 0,
                        // ✅ First local image (if exists)
                        'image'          => $this->getFirstLocalImage($propertyImageDir),
                        'listing_source' => 'airbnb',
                    ]
                );

                // ✅ Sync additional local images
                PropertyImage::where('property_id', $property->id)->delete();
                $localImages = $this->getAllLocalImages($propertyImageDir);

                foreach ($localImages as $imgPath) {
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image_path'  => $imgPath, // e.g. properties/12345/img1.jpg
                    ]);
                }

                // ✅ Sync amenities
                if (!empty($listing['amenities']) && is_array($listing['amenities'])) {
                    $amenityIds = [];
                    foreach ($listing['amenities'] as $amenityName) {
                        $amenity = Amenity::firstOrCreate(['name' => $amenityName]);
                        $amenityIds[] = $amenity->id;
                    }
                    $property->amenities()->sync($amenityIds);
                }

                $this->info("✅ Imported/Updated: " . $listing['title']);
                $count++;
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error("❌ Import failed: " . $e->getMessage());
            return 1;
        }

        $this->info("🎉 Finished! Imported/updated $count properties with local images & amenities.");
        return 0;
    }

    /**
     * Get first local image for property.
     */
    private function getFirstLocalImage($dir)
    {
        $path = storage_path("app/public/{$dir}");
        if (!is_dir($path)) {
            return null;
        }

        $files = glob($path . '/*.{jpg,jpeg,png}', GLOB_BRACE);
        if (empty($files)) {
            return null;
        }

        return "properties/" . basename($dir) . "/" . basename($files[0]);
    }

    /**
     * Get all local images for property.
     */
    private function getAllLocalImages($dir)
    {
        $path = storage_path("app/public/{$dir}");
        if (!is_dir($path)) {
            return [];
        }

        $files = glob($path . '/*.{jpg,jpeg,png}', GLOB_BRACE);
        $images = [];

        foreach ($files as $file) {
            $images[] = "properties/" . basename($dir) . "/" . basename($file);
        }

        return $images;
    }
}
