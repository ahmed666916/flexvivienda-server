<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $req)
    {
        $q = Property::query()->with(['images','city']);

        if ($req->filled('city')) {
            $q->whereHas('city', fn($c) => $c->where('name', $req->city));
        }
        if ($req->filled('q')) {
            $q->where(function($qq) use ($req){
                $qq->where('title','like','%'.$req->q.'%')
                   ->orWhere('summary','like','%'.$req->q.'%');
            });
        }
        if ($req->filled('min_price')) $q->where('price_per_night','>=',(int)$req->min_price);
        if ($req->filled('max_price')) $q->where('price_per_night','<=',(int)$req->max_price);
        if ($req->filled('beds'))      $q->where('beds','>=',(int)$req->beds);
        if ($req->filled('bedrooms'))  $q->where('bedrooms','>=',(int)$req->bedrooms);
        if ($req->filled('amenities')) {
            $names = array_map('trim', explode(',', $req->amenities));
            $q->whereHas('amenities', fn($a) => $a->whereIn('name', $names));
        }
        if ($req->filled('stay_type')) {
            $codes = array_map('trim', explode(',', $req->stay_type)); // short,mid,long
            $q->whereHas('stayTypes', fn($st) => $st->whereIn('code', $codes));
        }

        $q->where('status','published')->latest('id');

        return $q->paginate(24);
    }

    public function show($id)
    {
        return Property::with(['images','amenities','categories','city','stayTypes'])
            ->findOrFail($id);
    }
}
