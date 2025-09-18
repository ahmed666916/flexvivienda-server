<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class OwnerPropertyController extends Controller
{
    public function store(Request $r)
    {
        $data = $r->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'location'      => 'nullable|string', // legacy field
            'address'       => 'nullable|string', // new
            'city'          => 'nullable|string',
            'country'       => 'nullable|string',
            'rental_modes'  => 'nullable|array', // ["short","mid","long"]
            'amenities'     => 'nullable|array',
            'images'        => 'nullable|array',
        ]);

        $p = Property::create(array_merge($data, [
            'owner_id' => $r->user()->id,
            'status'   => 'pending',
        ]));

        return response()->json($p, 201);
    }

    public function update(Request $r, Property $property)
    {
        $this->authorize('update', $property);

        $data = $r->validate([
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'location'    => 'sometimes|string',
            'address'     => 'sometimes|string',
            'city'        => 'sometimes|string',
            'country'     => 'sometimes|string',
            'rental_modes'=> 'sometimes|array',
            'amenities'   => 'nullable|array',
        ]);

        // If owner edits after rejection -> back to pending
        if ($property->status === 'rejected') {
            $property->status = 'pending';
        }

        $property->fill($data)->save();

        return response()->json($property);
    }
}
