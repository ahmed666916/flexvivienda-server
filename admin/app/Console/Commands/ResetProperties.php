<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetProperties extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset:properties';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Truncate properties and related property_images safely';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('property_images')->truncate();
        DB::table('properties')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->info('✅ Properties and related images reset successfully!');
    }
}
