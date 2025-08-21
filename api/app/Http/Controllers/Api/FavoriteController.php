<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    // GET /favorites (list user’s favorite properties)
    public function index(Request $request)
    {
        $user = $request->user();

        $ids = DB::table('favorites')
            ->where('user_id', $user->id)
            ->pluck('property_id');

        // You likely have a PropertyResource already; returning minimal for speed
        $props = Property::whereIn('id', $ids)
            ->select('id','title','slug','city','lat','lng')
            ->with(['images' => fn($q) => $q->orderBy('sort_order')->limit(1)])
            ->get();

        return response()->json(['data' => $props]);
    }

    // POST /favorites/{property}  (toggle)
    public function toggle(Request $request, Property $property)
    {
        $user = $request->user();

        $exists = DB::table('favorites')
            ->where('user_id', $user->id)
            ->where('property_id', $property->id)
            ->exists();

        if ($exists) {
            DB::table('favorites')
                ->where('user_id', $user->id)
                ->where('property_id', $property->id)
                ->delete();

            return response()->json(['favorited' => false]);
        }

        DB::table('favorites')->insert([
            'user_id' => $user->id,
            'property_id' => $property->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['favorited' => true]);
    }
}
