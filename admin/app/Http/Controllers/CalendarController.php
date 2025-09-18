<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MarkusPoerschke\Ical\Ical;
use App\Models\Property;
use App\Models\Booking;
use App\Models\ExternalBooking;

class CalendarController extends Controller
{
    // Return booked dates (internal + external)
    public function availability($propertyId)
    {
        $internal = Booking::where('property_id', $propertyId)
            ->get(['check_in', 'check_out'])
            ->map(fn($b) => ['start' => $b->check_in, 'end' => $b->check_out, 'type' => 'internal']);

        $external = ExternalBooking::where('property_id', $propertyId)
            ->get(['start', 'end', 'summary'])
            ->map(fn($e) => ['start' => $e->start, 'end' => $e->end, 'type' => 'external', 'summary' => $e->summary]);

        return response()->json([
            'booked' => $internal->merge($external),
        ]);
    }

    // Import Airbnb iCal
    public function importIcal(Request $r)
    {
        $data = $r->validate([
            'property_id' => 'required|exists:properties,id',
            'ical_url'    => 'required|url',
        ]);

        $property = Property::findOrFail($data['property_id']);
        $property->ical_url = $data['ical_url'];
        $property->save();

        $ical = Ical::createFromUrl($data['ical_url']);

        foreach ($ical->getEvents() as $event) {
            ExternalBooking::updateOrCreate(
                [
                    'property_id'  => $property->id,
                    'external_id'  => $event->getUid(),
                ],
                [
                    'start'   => $event->getDtStart(),
                    'end'     => $event->getDtEnd(),
                    'summary' => $event->getSummary(),
                ]
            );
        }

        return response()->json(['ok' => true]);
    }
}
