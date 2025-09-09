<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Property;

class BookingController extends Controller
{
    /**
     * Admin: Display a listing of bookings (web view).
     */
    public function index()
    {
        $bookings = Booking::latest()->get();
        return view('admin.bookings.index', compact('bookings'));
    }

    /**
     * Store booking (old flow, e.g. contact form style).
     */
    public function store(Request $request)
    {
        // Detect if request is coming from API (with user auth)
        if ($request->user()) {
            // ✅ API booking flow
            $request->validate([
                'property_id' => 'required|exists:properties,id',
                'check_in'    => 'required|date',
                'check_out'   => 'required|date|after:check_in',
            ]);

            $booking = Booking::create([
                'user_id'     => $request->user()->id,
                'property_id' => $request->property_id,
                'check_in'    => $request->check_in,
                'check_out'   => $request->check_out,
                'status'      => 'active',
            ]);

            return response()->json([
                'message' => 'Booking successful!',
                'booking' => $booking,
            ], 201);
        }

        // ✅ Fallback: old booking form flow
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email',
            'phone'       => 'required|string|max:20',
            'guests'      => 'required|integer|min:1',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after:start_date',
            'total_price' => 'required|numeric|min:0',
        ]);

        $booking = Booking::create($validated);

        return response()->json($booking, 201);
    }

    /**
     * API: Cancel a booking (user).
     */
    public function destroy($id, Request $request)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $booking->update(['status' => 'canceled']);

        return response()->json(['message' => 'Booking canceled successfully']);
    }

    /**
     * API: Show authenticated user's bookings.
     */
    public function myBookings(Request $request)
    {
        $bookings = Booking::with('property')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($bookings);
    }

    /**
     * API: Show all bookings (admin only).
     */
    public function allBookings(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $bookings = Booking::with(['property', 'user'])->get();

        return response()->json($bookings);
    }

    /**
 * API: Get booked dates for a property (disable in calendar).
 */
        public function bookedDates($propertyId)
        {
            $bookings = Booking::where('property_id', $propertyId)
                ->where('status', 'active')
                ->get(['check_in', 'check_out']);

            return response()->json($bookings);
        }

}
