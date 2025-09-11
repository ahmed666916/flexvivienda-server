<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Calendar as GoogleCalendar;
use Google\Service\Calendar\CalendarListEntry;
use App\Models\Property;

class GoogleImportSingleAirbnb extends Command
{
    protected $signature = 'google:import-airbnb-one {external_id}';
    protected $description = 'Create Google Calendar for a single Airbnb property by external_id';

    private $service;

    public function handle()
    {
        $this->initGoogle();

        $externalId = $this->argument('external_id');

        $property = Property::where('external_id', $externalId)->first();

        if (!$property) {
            $this->error("❌ Property not found for external_id=$externalId");
            return 1;
        }

        if ($property->google_calendar_id) {
            $this->info("✔ Already linked: {$property->title} → {$property->google_calendar_id}");
            return 0;
        }

        try {
            // 1. Create a calendar
            $calendar = new GoogleCalendar();
            $calendar->setSummary("Airbnb - {$property->title}");
            $calendar->setTimeZone('Europe/Istanbul');

            $createdCalendar = $this->service->calendars->insert($calendar);

            // 2. Insert the calendar into the list
            $this->service->calendarList->insert(new CalendarListEntry([
                'id' => $createdCalendar->getId()
            ]));

            // 3. Save ID in DB
            $property->update([
                'google_calendar_id' => $createdCalendar->getId()
            ]);

            $this->info("✅ Created Google Calendar for {$property->title} ({$property->id})");
        } catch (\Exception $e) {
            $this->error("❌ Failed for {$property->title}: " . $e->getMessage());
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
