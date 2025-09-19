<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MarkusPoerschke\Ical\Ical;
use App\Models\Property;
use App\Models\Booking;
use App\Models\ExternalBooking;
use App\Models\PropertyCalendar;
use Carbon\Carbon;

class CalendarController extends Controller
{
    // Full calendar: availability + price + bookings
    public function availability(Request $request, $propertyId)
    {
        $month = $request->query('month', now()->month);
        $year  = $request->query('year', now()->year);

        $start = Carbon::create($year, $month, 1)->startOfMonth();
        $end   = $start->copy()->endOfMonth();

        $property = Property::findOrFail($propertyId);

        // ✅ Seasonal prices
        $calendarRows = PropertyCalendar::where('property_id', $propertyId)
            ->whereBetween('date', [$start, $end])
            ->get()
            ->keyBy(fn($row) => $row->date->toDateString());

        // ✅ Internal bookings
        $internal = Booking::where('property_id', $propertyId)
            ->get(['check_in', 'check_out'])
            ->map(fn($b) => [
                'start' => $b->check_in,
                'end'   => $b->check_out,
                'type'  => 'internal',
            ]);

        // ✅ External bookings (match migration)
        $external = ExternalBooking::where('property_id', $propertyId)
            ->get(['check_in', 'check_out', 'source'])
            ->map(fn($e) => [
                'start'   => $e->check_in,
                'end'     => $e->check_out,
                'type'    => 'external',
                'summary' => $e->source,
            ]);

        // ✅ Build day records
        $days = [];
        for ($date = $start->copy(); $date <= $end; $date->addDay()) {
            $key = $date->toDateString();
            $row = $calendarRows->get($key);

            $days[] = [
                'date'     => $key,
                'price'    => $row->price ?? $property->price_per_day,
                'status'   => $row->status ?? 'available',
                'min_stay' => $row->min_stay ?? 1,
            ];
        }

        return response()->json([
            'days'   => $days,
            'booked' => $internal->merge($external)->values(),
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
                    'property_id' => $property->id,
                    'external_id' => $event->getUid(),
                ],
                [
                    'check_in'  => $event->getDtStart(),
                    'check_out' => $event->getDtEnd(),
                    'source'    => 'airbnb',
                ]
            );
        }

        return response()->json(['ok' => true]);
    }
}
