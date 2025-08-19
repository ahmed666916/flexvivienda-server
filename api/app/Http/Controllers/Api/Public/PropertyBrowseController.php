<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyBrowseController extends Controller
{
    public function index(Request $r) {
        $q = Property::query()->with('images:property_id,url,sort_order','city','stayTypes')
            ->where('status','published');

        if ($r->city_id)         $q->where('city_id',$r->city_id);
        if ($r->stay_type)       $q->whereHas('stayTypes', fn($h)=>$h->where('slug',$r->stay_type));
        if ($r->min_price)       $q->where('price_per_night','>=',$r->min_price);
        if ($r->max_price)       $q->where('price_per_night','<=',$r->max_price);
        if ($r->guests)          $q->where('max_guests','>=',$r->guests);
        if ($r->amenity_ids)     $q->whereHas('amenities', fn($h)=>$h->whereIn('amenities.id', (array)$r->amenity_ids));
        if ($r->bounds) { // bounds = "south,west,north,east"
            [$s,$w,$n,$e] = array_map('floatval', explode(',', $r->bounds));
            $q->whereBetween('lat', [$s,$n])->whereBetween('lng', [$w,$e]);
        }

        return $q->orderBy('is_featured','desc')->orderByDesc('id')->paginate(12);
    }

    public function show(string $slug) {
        return Property::with('images','amenities','categories','stayTypes','city')
            ->where('slug',$slug)->where('status','published')->firstOrFail();
    }
}