<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;

class ImportAirbnbIcalUrls extends Command
{
    protected $signature = 'import:airbnb-icals {file?}';
    protected $description = 'Update properties with Airbnb iCal URLs from JSON file';

    public function handle()
    {
        $file = $this->argument('file') ?? base_path('../scrapers/airbnb_listings_updated.json');

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
        foreach ($listings as $listing) {
            if (!empty($listing['id']) && !empty($listing['icalUrl'])) {
                $property = Property::where('external_id', $listing['id'])->first();

                if ($property) {
                    $property->update(['ical_url' => $listing['icalUrl']]);
                    $count++;
                }
            }
        }

        $this->info("✅ Updated $count properties with iCal URLs.");
        return 0;
    }
}
