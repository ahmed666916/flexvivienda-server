<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BookingController extends Controller
{
    public function store(Request $r) {
        $data = $r->validate([
            'property_id'=>'required|integer|exists:properties,id',
            'start_date'=>'required|date|after_or_equal:today',
            'end_date'=>'required|date|after:start_date',
            'guests'=>'required|integer|min:1',
        ]);

        $p = Property::findOrFail($data['property_id']);

        // TODO: check availability blocks + overlapping bookings

        $status = $p->require_manual_approval ? 'awaiting_admin' : 'confirmed';

        $b = Booking::create([
            'property_id'=>$p->id,
            'user_id'=>optional($r->user())->id,
            'start_date'=>$data['start_date'],
            'end_date'=>$data['end_date'],
            'guests'=>$data['guests'],
            'total_price'=>null, // compute later
            'status'=>$status,
            'payment_status'=>'unpaid',
            'channel'=>'direct',
        ]);

        // If manual approval, notify admin; else proceed to payment intent

        return $b;
    }
}