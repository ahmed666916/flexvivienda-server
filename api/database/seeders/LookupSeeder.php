<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class LookupSeeder extends Seeder {
    public function run(): void {
        DB::table('stay_types')->upsert([
            ['name'=>'Short Stay','slug'=>'short','min_nights'=>1,'max_nights'=>99],
            ['name'=>'Mid Stay','slug'=>'mid','min_nights'=>60,'max_nights'=>180],
            ['name'=>'Long Stay','slug'=>'long','min_nights'=>100,'max_nights'=>null],
        ], ['slug']);

        $amenities = [
            'Wi-Fi','Pool','Parking','Air Conditioning','Heating',
            'Washer','Dryer','Kitchen','Sea View','Garden',
            'Jacuzzi','Elevator'
        ];

        foreach ($amenities as $a) {
            DB::table('amenities')->updateOrInsert(['name'=>$a], []);
        }
    }
}
