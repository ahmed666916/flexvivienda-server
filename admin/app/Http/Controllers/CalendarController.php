<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use ICal\ICal;

class CalendarController extends Controller
{
    // Returns booked dates for a property (merge your Booking table + imported iCal)
    public function availability($propertyId)
    {
        $booked = \App\Models\Booking::where('property_id', $propertyId)
            ->get(['check_in','check_out']);
        return response()->json(['booked'=>$booked]);
    }

    // Import a public iCal URL (Airbnb export)
    public function importIcal(Request $r)
    {
        $data = $r->validate([
            'property_id' => 'required|exists:properties,id',
            'ical_url' => 'required|url'
        ]);

        $ical = new ICal($data['ical_url'], ['defaultTimezone' => 'UTC']);
        foreach ($ical->events() as $e) {
            \App\Models\Booking::updateOrCreate(
                [
                    'property_id'=>$data['property_id'],
                    'external_ref'=>$e->uid
                ],
                [
                    'check_in'=>$e->dtstart_array[2],
                    'check_out'=>$e->dtend_array[2],
                    'status'=>'blocked',
                    'source'=>'airbnb'
                ]
            );
        }
        return response()->json(['ok'=>true]);
    }
}
