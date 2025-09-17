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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string',
            'rental_modes' => 'required|array', // ["short","mid","long"]
            'images' => 'array',
        ]);

        $p = new Property($data);
        $p->owner_id = $r->user()->id;
        $p->status = 'pending';
        $p->save();

        return response()->json($p, 201);
    }

    public function update(Request $r, Property $property)
    {
        $this->authorize('update', $property);
        $data = $r->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'location' => 'sometimes|string',
            'rental_modes' => 'sometimes|array',
        ]);

        $property->update($data);
        return response()->json($property);
    }
}
