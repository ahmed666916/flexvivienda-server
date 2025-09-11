<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Calendar as GoogleCalendar;
use Google\Service\Calendar\CalendarListEntry;
use App\Models\Property;

class ImportAirbnbToGoogleCalendar extends Command
{
    protected $signature = 'google:import-airbnb-icals 
                            {file=storage/app/airbnb_listings_updated.json}
                            {--limit=0 : Limit how many properties to process}
                            {--delay=3 : Delay in seconds between requests}';

    protected $description = 'Create Google Calendars and subscribe Airbnb iCal feeds for each property';

    private $service;

    public function handle()
    {
        $this->initGoogle();

        $file = $this->argument('file');
        if (!file_exists($file)) {
            $this->error("❌ File not found: $file");
            return 1;
        }

        $listings = json_decode(file_get_contents($file), true);
        if (!$listings) {
            $this->error("❌ Failed to parse JSON");
            return 1;
        }

        $limit = (int) $this->option('limit');
        $delay = (int) $this->option('delay');
        $count = 0;

        foreach ($listings as $listing) {
            if (empty($listing['icalUrl']) || empty($listing['id'])) {
                $this->warn("Skipping listing (missing ID or iCal URL).");
                continue;
            }

            $property = Property::where('external_id', $listing['id'])->first();
            if (!$property) {
                $this->warn("No property found for external_id={$listing['id']}");
                continue;
            }

            if ($property->google_calendar_id) {
                $this->info("✔ Already linked: {$property->title}");
                continue;
            }

            try {
                // 1. Create a Google Calendar
                $calendar = new GoogleCalendar();
                $calendar->setSummary("Airbnb - {$property->title}");
                $calendar->setTimeZone('Europe/Istanbul');

                $createdCalendar = $this->service->calendars->insert($calendar);

                // 2. Add calendar to the list
                $this->service->calendarList->insert(new CalendarListEntry([
                    'id' => $createdCalendar->getId()
                ]));

                // 3. Save Google Calendar ID to DB
                $property->update([
                    'google_calendar_id' => $createdCalendar->getId()
                ]);

                $this->info("✅ Created Google Calendar for {$property->title}");

                $count++;
                if ($limit > 0 && $count >= $limit) {
                    $this->info("⏹ Limit of {$limit} reached, stopping.");
                    break;
                }

                // Prevent rate limit hits
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

        $oauthPath = storage_path('app/google/credentials.json');
        $servicePath = storage_path('app/google/service-account.json');

        if (file_exists($servicePath)) {
            $client->setAuthConfig($servicePath);
            $client->setScopes(Calendar::CALENDAR);
            $this->info("🔑 Using Service Account credentials.");
        } elseif (file_exists($oauthPath)) {
            $client->setAuthConfig($oauthPath);
            $client->setScopes(Calendar::CALENDAR);
            $client->setAccessType('offline');
            $client->setPrompt('select_account consent');
            $this->info("🔑 Using OAuth Client credentials.");
        } else {
            throw new \Exception("No Google credentials found in storage/app/google/");
        }

        $this->service = new Calendar($client);
    }
}
