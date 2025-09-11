<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;
use App\Models\ExternalBooking;
use Illuminate\Support\Facades\Http;
use ICal\ICal;

class SyncAirbnbIcal extends Command
{
    protected $signature = 'sync:airbnb-ical {--limit=0} {--delay=2}';
    protected $description = 'Sync Airbnb iCal reservations into external_bookings table';

    public function handle()
    {
        $limit = (int) $this->option('limit');
        $delay = (int) $this->option('delay');

        $query = Property::whereNotNull('ical_url');
        if ($limit > 0) {
            $query->limit($limit);
        }
        $properties = $query->get();

        if ($properties->isEmpty()) {
            $this->info("No properties with iCal URL found.");
            return 0;
        }

        foreach ($properties as $property) {
            $this->info("Syncing property #{$property->id} - {$property->title}");

            try {
                $icalUrl = $property->ical_url;

                $icsResponse = Http::timeout(30)->get($icalUrl);

                if ($icsResponse->failed()) {
                    $this->error("❌ Failed fetching iCal for {$property->id}: HTTP " . $icsResponse->status());
                    continue;
                }

                $ical = new ICal(false, [
                    'defaultSpan' => 2,
                    'defaultTimeZone' => 'UTC',
                    'defaultWeekStart' => 'MO',
                ]);
                $ical->initString($icsResponse->body());

                foreach ($ical->events() as $event) {
                    $checkIn  = date('Y-m-d', strtotime($event->dtstart));
                    $checkOut = date('Y-m-d', strtotime($event->dtend));
                    $uid      = $event->uid ?? null;

                    ExternalBooking::updateOrCreate(
                        [
                            'property_id' => $property->id,
                            'external_id' => $uid,
                            'source'      => 'airbnb',
                        ],
                        [
                            'check_in'  => $checkIn,
                            'check_out' => $checkOut,
                        ]
                    );
                }

                $this->info("✔ Synced iCal for property {$property->id}");
            } catch (\Exception $e) {
                $this->error("❌ Failed syncing property {$property->id}: " . $e->getMessage());
            }

            // ✅ Delay between requests to avoid 429
            if ($delay > 0) {
                sleep($delay);
            }
        }

        return 0;
    }
}
