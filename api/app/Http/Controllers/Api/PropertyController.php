<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PropertyController extends Controller
{
    /**
     * GET /api/properties
     *
     * Query params (all optional):
     * - q:            string  (search in title/summary)
     * - city:         string  (exact city name)
     * - min_price:    int
     * - max_price:    int
     * - beds:         int     (>=)
     * - bedrooms:     int     (>=)
     * - guests:       int     (>= max_guests)
     * - amenities:    csv     (amenity names)
     * - stay_type:    csv     (codes: short,mid,long)
     * - featured:     bool    (only featured listings)
     * - sort:         price_asc | price_desc | newest (default newest)
     * - per_page:     int     (1..100; default 24)
     */
    public function index(Request $req)
    {
        // ---- Validate light inputs (won’t 422 for unknown filters) ----
        $req->validate([
            'q'         => ['nullable','string','max:200'],
            'city'      => ['nullable','string','max:120'],
            'min_price' => ['nullable','integer','min:0'],
            'max_price' => ['nullable','integer','min:0'],
            'beds'      => ['nullable','integer','min:0'],
            'bedrooms'  => ['nullable','integer','min:0'],
            'guests'    => ['nullable','integer','min:0'],
            'amenities' => ['nullable','string'],
            'stay_type' => ['nullable','string'],
            'featured'  => ['nullable','boolean'],
            'sort'      => ['nullable', Rule::in(['newest','price_asc','price_desc'])],
            'per_page'  => ['nullable','integer','min:1','max:100'],
        ]);

        $perPage = (int) ($req->integer('per_page') ?: 24);
        $sort    = $req->input('sort', 'newest');

        // ---- Base query with eager-loads ----
        $q = Property::query()
            ->with(['images','city','stayTypes','amenities'])
            ->where('status', 'published');

        // ---- Filters ----
        if ($req->filled('q')) {
            $term = trim($req->input('q'));
            $q->where(function ($qq) use ($term) {
                $qq->where('title', 'like', "%{$term}%")
                   ->orWhere('summary', 'like', "%{$term}%")
                   ->orWhere('description', 'like', "%{$term}%");
            });
        }

        if ($req->filled('city')) {
            $q->whereHas('city', function ($cq) use ($req) {
                $cq->where('name', $req->input('city'));
            });
        }

        if ($req->filled('min_price')) {
            $q->where('price_per_night', '>=', (int)$req->input('min_price'));
        }
        if ($req->filled('max_price')) {
            $q->where('price_per_night', '<=', (int)$req->input('max_price'));
        }

        if ($req->filled('beds')) {
            $q->where('beds', '>=', (int)$req->input('beds'));
        }
        if ($req->filled('bedrooms')) {
            $q->where('bedrooms', '>=', (int)$req->input('bedrooms'));
        }
        if ($req->filled('guests')) {
            $q->where('max_guests', '>=', (int)$req->input('guests'));
        }

        if ($req->filled('amenities')) {
            $names = array_filter(array_map('trim', explode(',', $req->input('amenities'))));
            if ($names) {
                $q->whereHas('amenities', fn ($a) => $a->whereIn('name', $names));
            }
        }

        if ($req->filled('stay_type')) {
            $codes = array_filter(array_map('trim', explode(',', $req->input('stay_type'))));
            if ($codes) {
                $q->whereHas('stayTypes', fn ($st) => $st->whereIn('code', $codes));
            }
        }

        if ($req->boolean('featured', false)) {
            $q->where('is_featured', true);
        }

        // ---- Sorting ----
        switch ($sort) {
            case 'price_asc':
                $q->orderBy('price_per_night', 'asc')->orderBy('id', 'desc');
                break;
            case 'price_desc':
                $q->orderBy('price_per_night', 'desc')->orderBy('id', 'desc');
                break;
            default: // newest
                $q->latest('id');
        }

        // ---- Paginate & wrap in Resource collection ----
        $paginator = $q->paginate($perPage)->appends($req->query());

        return PropertyResource::collection($paginator);
    }

    /**
     * GET /api/properties/{idOrSlug}
     * Accepts either numeric ID or slug.
     */
    public function show(string $idOrSlug)
    {
        $property = Property::query()
            ->with(['images','amenities','categories','city','stayTypes'])
            ->when(is_numeric($idOrSlug),
                fn ($qq) => $qq->where('id', (int)$idOrSlug),
                fn ($qq) => $qq->where('slug', $idOrSlug)
            )
            ->firstOrFail();

        return new PropertyResource($property);
    }
}
