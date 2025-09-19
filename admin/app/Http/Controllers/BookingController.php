<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\ExternalBooking;

class BookingController extends Controller
{
    /**
     * API: Get booked dates for a property (disable in calendar).
     */
    public function bookedDates($propertyId)
    {
        // Local bookings (direct website bookings)
        $local = Booking::where('property_id', $propertyId)
            ->where('status', 'active')
            ->get(['check_in', 'check_out'])
            ->map(fn($b) => [
                'start' => $b->check_in,
                'end'   => $b->check_out,
                'type'  => 'internal',
            ]);

        // External bookings (Airbnb, Booking.com, etc.)
        $external = ExternalBooking::where('property_id', $propertyId)
            ->get(['check_in', 'check_out', 'source'])
            ->map(fn($b) => [
                'start'   => $b->check_in,
                'end'     => $b->check_out,
                'type'    => 'external',
                'summary' => $b->source ?? 'external',
            ]);

        return response()->json([
            'booked' => $local->merge($external)->values(),
        ]);
    }
}
