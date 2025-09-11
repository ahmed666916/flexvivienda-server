<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;

class PatchPropertyExternalIds extends Command
{
    protected $signature = 'patch:property-external-ids {file?}';
    protected $description = 'Patch properties with external_id and ical_url from Airbnb JSON';

    public function handle()
    {
        $file = $this->argument('file') ?? base_path('../scrapers/airbnb_listings_updated.json');

        if (!file_exists($file)) {
            $this->error("❌ File not found: $file");
            return 1;
        }

        $listings = json_decode(file_get_contents($file), true);
        if (!$listings || !is_array($listings)) {
            $this->error("❌ Invalid JSON");
            return 1;
        }

        $count = 0;

        foreach ($listings as $listing) {
            if (empty($listing['id']) || empty($listing['title'])) continue;

            $property = Property::where('title', $listing['title'])->first();

            if ($property) {
                $property->external_id = (string) $listing['id'];
                $property->ical_url = $listing['icalUrl'] ?? null;
                $property->save();
                $count++;
            }
        }

        $this->info("✅ Patched $count properties with external_id + ical_url.");
        return 0;
    }
}
