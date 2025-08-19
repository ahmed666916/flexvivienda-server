<?php 

namespace App\Http\Controllers\Api\Owner;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OwnerPropertyController extends Controller
{
    public function index(Request $r) {
        $ownerId = optional($r->user()->owner)->id ?? null;
        if (!$ownerId) return response()->json([]);
        return Property::with('images','city','stayTypes','amenities','categories')
            ->where('owner_id',$ownerId)
            ->orderByDesc('id')
            ->paginate(20);
    }

    public function store(Request $r) {
        $u = $r->user();
        $ownerId = optional($u->owner)->id;
        abort_unless($ownerId, 403);

        $data = $r->validate([
            'title'=>'required|string|max:255',
            'description'=>'nullable|string',
            'city_id'=>'nullable|integer|exists:cities,id',
            'address_line'=>'nullable|string|max:255',
            'lat'=>'nullable|numeric',
            'lng'=>'nullable|numeric',
            'bedrooms'=>'nullable|integer|min:0',
            'bathrooms'=>'nullable|integer|min:0',
            'max_guests'=>'nullable|integer|min:1',
            'price_per_night'=>'nullable|numeric',
            'price_per_month'=>'nullable|numeric',
            'amenity_ids'=>'array',
            'amenity_ids.*'=>'integer|exists:amenities,id',
            'category_ids'=>'array',
            'category_ids.*'=>'integer|exists:categories,id',
            'stay_type_slugs'=>'array', // ['short','mid','long']
            'images'=>'array',
            'images.*.url'=>'required|string',
            'require_manual_approval'=>'boolean',
        ]);

        $slugBase = Str::slug($data['title']);
        $slug = $slugBase; $i=1;
        while (Property::where('slug',$slug)->exists()) { $slug = $slugBase.'-'.$i++; }

        $p = Property::create([
            'owner_id'=>$ownerId,
            'city_id'=>$data['city_id'] ?? null,
            'title'=>$data['title'],
            'slug'=>$slug,
            'description'=>$data['description'] ?? null,
            'address_line'=>$data['address_line'] ?? null,
            'lat'=>$data['lat'] ?? null,
            'lng'=>$data['lng'] ?? null,
            'bedrooms'=>$data['bedrooms'] ?? 0,
            'bathrooms'=>$data['bathrooms'] ?? 0,
            'max_guests'=>$data['max_guests'] ?? 1,
            'price_per_night'=>$data['price_per_night'] ?? null,
            'price_per_month'=>$data['price_per_month'] ?? null,
            'status'=>'pending_review',
            'require_manual_approval'=>$data['require_manual_approval'] ?? false,
        ]);

        if (!empty($data['amenity_ids'])) $p->amenities()->sync($data['amenity_ids']);
        if (!empty($data['category_ids'])) $p->categories()->sync($data['category_ids']);
        if (!empty($data['stay_type_slugs'])) {
            $ids = \App\Models\StayType::whereIn('slug',$data['stay_type_slugs'])->pluck('id');
            $p->stayTypes()->sync($ids);
        }
        if (!empty($data['images'])) {
            foreach ($data['images'] as $idx=>$img) {
                PropertyImage::create([
                    'property_id'=>$p->id,
                    'url'=>$img['url'],
                    'caption'=>$img['caption'] ?? null,
                    'sort_order'=>$idx
                ]);
            }
        }

        // (Optional) notify admins that a new submission is waiting

        return response()->json($p->load('images','amenities','categories','stayTypes'));
    }

    public function update(Request $r, int $id) {
        $p = Property::findOrFail($id);
        abort_unless($r->user()->role === 'admin' || optional($r->user()->owner)->id === $p->owner_id, 403);
        if ($p->status === 'published' && $r->user()->role !== 'admin') {
            return response()->json(['message'=>'Cannot edit a published property'], 422);
        }
        // same validation as store (shortened here)
        $data = $r->validate([
            'title'=>'sometimes|string|max:255',
            'description'=>'nullable|string',
            'price_per_night'=>'nullable|numeric',
            'price_per_month'=>'nullable|numeric',
        ]);
        $p->update($data);
        return $p->fresh();
    }
}