<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Calendar as GoogleCalendar;
use Google\Service\Calendar\CalendarListEntry;
use Google\Service\Calendar\Event;
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

                // 3. Save Google Calendar ID
                $property->google_calendar_id = $createdCalendar->getId();
                $property->save();

                $this->info("✅ Created Google Calendar for {$property->title} ({$property->id})");

                // 4. Subscribe Airbnb iCal URL → fetch and insert events
                $this->importIcalEvents($listing['icalUrl'], $property->google_calendar_id);

                $count++;
                if ($limit > 0 && $count >= $limit) {
                    $this->info("⏹ Limit of {$limit} reached, stopping.");
                    break;
                }

                sleep($delay); // avoid Google rate limit
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
        $oauthPath = storage_path('app/google/credentials.json');

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

    private function importIcalEvents(string $icalUrl, string $calendarId)
    {
        try {
            $ics = @file_get_contents($icalUrl);
            if (!$ics) {
                $this->warn("⚠️ Could not fetch iCal feed: {$icalUrl}");
                return;
            }

            // Parse .ics file manually (simplified version: only DTSTART/DTEND)
            preg_match_all('/BEGIN:VEVENT(.*?)END:VEVENT/s', $ics, $matches);
            foreach ($matches[1] as $eventBlock) {
                preg_match('/DTSTART.*:(\d+)/', $eventBlock, $startMatch);
                preg_match('/DTEND.*:(\d+)/', $eventBlock, $endMatch);

                if (!isset($startMatch[1], $endMatch[1])) {
                    continue;
                }

                $start = \DateTime::createFromFormat('Ymd', substr($startMatch[1], 0, 8));
                $end   = \DateTime::createFromFormat('Ymd', substr($endMatch[1], 0, 8));

                if (!$start || !$end) {
                    continue;
                }

                $event = new Event([
                    'summary' => 'Airbnb Booking',
                    'start'   => ['date' => $start->format('Y-m-d')],
                    'end'     => ['date' => $end->format('Y-m-d')],
                ]);

                $this->service->events->insert($calendarId, $event);
            }

            $this->info("📥 Imported Airbnb iCal events into {$calendarId}");
        } catch (\Exception $e) {
            $this->warn("⚠️ Failed to import iCal events: " . $e->getMessage());
        }
    }
}
