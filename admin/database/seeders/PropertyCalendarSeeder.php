<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\PropertyCalendar;
use Carbon\Carbon;

class PropertyCalendarSeeder extends Seeder
{
    public function run()
    {
        $properties = Property::all();

        foreach ($properties as $property) {
            $start = Carbon::now()->startOfMonth();
            $end = Carbon::now()->addMonths(3)->endOfMonth(); // 3 months ahead

            $current = $start->copy();

            while ($current <= $end) {
                PropertyCalendar::updateOrCreate(
                    [
                        'property_id' => $property->id,
                        'date'        => $current->format('Y-m-d'),
                    ],
                    [
                        'price'    => rand(80, 250), // random seasonal price
                        'status'   => collect(['available', 'booked', 'blocked'])->random(),
                        'min_stay' => rand(1, 5),
                    ]
                );

                $current->addDay();
            }
        }
    }
}
