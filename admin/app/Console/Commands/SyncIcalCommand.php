<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncIcalCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-ical-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): int
        {
            $links = \App\Models\Property::whereNotNull('airbnb_ical_url')->get();
            foreach ($links as $p) {
                // hit the same import endpoint logic directly (or refactor into a service)
                app(\App\Http\Controllers\CalendarController::class)
                    ->importIcal(new \Illuminate\Http\Request([
                        'property_id'=>$p->id, 'ical_url'=>$p->airbnb_ical_url
                    ]));
            }
            $this->info('iCal sync done');
            return self::SUCCESS;
        }

}
