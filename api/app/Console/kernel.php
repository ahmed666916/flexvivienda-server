<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Register the commands for the application.
     *
     * Add your custom Artisan commands here so `php artisan`
     * can discover them.
     */
    protected $commands = [
        // ⬇️ Register your custom commands
        \App\Console\Commands\ImportAirbnbListings::class,
        \App\Console\Commands\BackfillPropertyImages::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * You can schedule syncs/backfills here later.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Example (disabled by default):
        // $schedule->command('import:airbnb storage/app/airbnb_listings.json --limit=0')
        //          ->dailyAt('03:00')
        //          ->withoutOverlapping();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        // If you keep route-based console commands:
        // require base_path('routes/console.php');
    }
}
