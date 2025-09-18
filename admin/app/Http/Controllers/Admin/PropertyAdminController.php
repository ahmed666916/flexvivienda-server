<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyAdminController extends Controller
{
    public function pending()
    {
        return Property::with('owner', 'rates')
            ->where('status', 'pending')
            ->latest()
            ->paginate(20);
    }

    public function approve(Property $property)
    {
        $property->update(['status' => 'approved']);
        return response()->json(['ok' => true]);
    }

    public function reject(Request $r, Property $property)
    {
        $property->update(['status' => 'rejected']);
        // optionally record reason: $r->input('reason')
        return response()->json(['ok' => true]);
    }

    public function updateRates(Request $r, Property $property)
    {
        $payload = $r->validate([
            'short.price'      => 'nullable|numeric|min:0',
            'short.min_nights' => 'nullable|integer|min:1',
            'short.max_nights' => 'nullable|integer|min:1',
            'mid.price'        => 'nullable|numeric|min:0',
            'mid.min_nights'   => 'nullable|integer|min:1',
            'mid.max_nights'   => 'nullable|integer|min:1',
            'long.price'       => 'nullable|numeric|min:0',
            'long.min_nights'  => 'nullable|integer|min:1',
            'long.max_nights'  => 'nullable|integer|min:1',
        ]);

        foreach (['short', 'mid', 'long'] as $stay) {
            if (isset($payload[$stay])) {
                $property->rates()->updateOrCreate(
                    ['stay_type' => $stay],
                    $payload[$stay]
                );
            }
        }

        // return updated property with rates for React Admin
        return $property->load('rates');
    }
}
