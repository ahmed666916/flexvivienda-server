<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyRate;
use Illuminate\Http\Request;

class PropertyAdminController extends Controller
{
    public function pending()
    {
        return Property::with('rates','owner')
            ->where('status','pending')->latest()->paginate(20);
    }

    public function approve(Property $property)
    {
        $property->update(['status'=>'approved']);
        return response()->json(['ok'=>true]);
    }

    public function reject(Property $property, Request $r)
    {
        $property->update([
            'status'=>'rejected',
        ]);
        return response()->json(['ok'=>true]);
    }

    public function updateRates(Property $property, Request $r)
    {
        $payload = $r->validate([
            'rates' => 'required|array',
            'rates.*.mode' => 'required|in:short,mid,long',
            'rates.*.price_per_night' => 'required|numeric|min:0',
            'rates.*.min_nights' => 'required|integer|min:1',
        ]);

        foreach ($payload['rates'] as $rate) {
            PropertyRate::updateOrCreate(
                ['property_id'=>$property->id,'mode'=>$rate['mode']],
                ['price_per_night'=>$rate['price_per_night'], 'min_nights'=>$rate['min_nights']]
            );
        }

        return response()->json(['ok'=>true]);
    }
}
