<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Google\Client;
use Google\Service\Calendar;
use App\Models\Property;
use App\Models\ExternalBooking;

class SyncGoogleCalendars extends Command
{
    protected $signature = 'sync:google-calendars 
                            {--limit=0 : Limit how many properties to process}
                            {--delay=2 : Delay in seconds between requests}';

    protected $description = 'Sync bookings from Google Calendars into external_bookings table';

    private $service;

    public function handle()
    {
        $this->initGoogle();

        $limit = (int) $this->option('limit');
        $delay = (int) $this->option('delay');
        $count = 0;

        $properties = Property::whereNotNull('google_calendar_id')->get();

        foreach ($properties as $property) {
            $this->info("📅 Syncing {$property->title}");

            try {
                $events = $this->service->events->listEvents($property->google_calendar_id);

                foreach ($events->getItems() as $event) {
                    if (!$event->getStart() || !$event->getEnd()) {
                        continue;
                    }

                    $checkIn = $event->getStart()->getDate() ?? $event->getStart()->getDateTime();
                    $checkOut = $event->getEnd()->getDate() ?? $event->getEnd()->getDateTime();

                    if (!$checkIn || !$checkOut) {
                        continue;
                    }

                    // Normalize to YYYY-MM-DD
                    $checkIn = date('Y-m-d', strtotime($checkIn));
                    $checkOut = date('Y-m-d', strtotime($checkOut));

                    ExternalBooking::updateOrCreate(
                        [
                            'property_id' => $property->id,
                            'external_id' => $event->getId(),
                            'source'      => 'airbnb',
                        ],
                        [
                            'check_in'  => $checkIn,
                            'check_out' => $checkOut,
                        ]
                    );
                }

                $this->info("✅ Synced {$property->title}");

                $count++;
                if ($limit > 0 && $count >= $limit) {
                    $this->info("⏹ Limit of {$limit} reached, stopping.");
                    break;
                }

                sleep($delay);

            } catch (\Exception $e) {
                $this->error("❌ Failed for {$property->title}: " . $e->getMessage());
            }
        }

        return 0;
    }

    private function initGoogle()
    {
        $client = new Client();

        $servicePath = storage_path('app/google/service-account.json');
        $oauthPath   = storage_path('app/google/credentials.json');

        if (file_exists($servicePath)) {
            $client->setAuthConfig($servicePath);
            $client->setScopes(Calendar::CALENDAR_READONLY);
            $this->info("🔑 Using Service Account credentials.");
        } elseif (file_exists($oauthPath)) {
            $client->setAuthConfig($oauthPath);
            $client->setScopes(Calendar::CALENDAR_READONLY);
            $this->info("🔑 Using OAuth credentials.");
        } else {
            throw new \Exception("No Google credentials found.");
        }

        $this->service = new Calendar($client);
    }
}
