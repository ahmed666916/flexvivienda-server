<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::orderByDesc('id')->paginate(10);
        return view('properties.index', compact('properties'));
    }

    public function create()
    {
        return view('properties.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'         => 'required|string|max:255',
            'location'      => 'required|string',
            'latitude'      => 'required',
            'longitude'     => 'required',
            'price_per_day' => 'required|numeric',
            'images'        => 'required|array|min:4',
            'property_type' => 'required|array',
        ]);

        $property = Property::create([
            'title'        => $request->title,
            'description'  => $request->description,
            'location'     => $request->location,
            'latitude'     => $request->latitude,
            'longitude'    => $request->longitude,
            'size'         => $request->size,
            'bedrooms'     => $request->bedrooms,
            'bathrooms'    => $request->bathrooms,
            'max_persons'  => $request->max_persons,
            'price_per_day'=> $request->price_per_day,
            'is_featured'  => $request->has('featured'),
            'amenities'    => $request->amenities ?? [],
            'rules'        => explode(',', $request->rules ?? ''),
            'cancellation' => explode(',', $request->cancellation ?? ''),
            'neighborhood' => explode(',', $request->neighborhood ?? ''),
            'property_type'=> $request->property_type ?? [],
            'status'       => 'available'
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('properties.index')->with('success', 'Property created successfully!');
    }

    public function show($id)
    {
        $property = Property::with('images')->findOrFail($id);

        return response()->json([
            'id'          => $property->id,
            'title'       => $property->title,
            'location'    => $property->location,
            'description' => $property->description,
            'lat'         => $property->latitude,
            'lng'         => $property->longitude,
            'price'       => $property->price_per_day,
            'amenities'   => is_array($property->amenities) ? $property->amenities : json_decode($property->amenities, true) ?? [],
            'rules'       => is_array($property->rules) ? $property->rules : json_decode($property->rules, true) ?? [],
            'cancellation'=> is_array($property->cancellation) ? $property->cancellation : json_decode($property->cancellation, true) ?? [],
            'neighborhood'=> is_array($property->neighborhood) ? $property->neighborhood : json_decode($property->neighborhood, true) ?? [],

            // ✅ Always return both
            'image'       => $property->images->first() ? asset('storage/' . $property->images->first()->image_path) : null,
            'images'      => $property->images->map(fn($img) => ['url' => asset('storage/' . $img->image_path)]),
        ]);
    }

    public function edit(string $id)
    {
        $properties = Property::find($id);
        return view('properties.edit', ['property'=>$properties]);
    }

    public function update(Request $request, Property $property)
    {
        $request->validate([
            'title'         => 'required|string|max:255',
            'location'      => 'required|string',
            'latitude'      => 'required|numeric',
            'longitude'     => 'required|numeric',
            'price_per_day' => 'required|numeric|min:0',
            'images.*'      => 'image|mimes:jpg,jpeg,png|max:2048',
            'property_type' => 'required|array|min:1',
        ]);

        $property->update([
            'title'        => $request->title,
            'description'  => $request->description,
            'location'     => $request->location,
            'latitude'     => $request->latitude,
            'longitude'    => $request->longitude,
            'size'         => $request->size,
            'bedrooms'     => $request->bedrooms,
            'bathrooms'    => $request->bathrooms,
            'max_persons'  => $request->max_persons,
            'price_per_day'=> $request->price_per_day,
            'featured'     => $request->has('featured'),
            'amenities'    => json_encode($request->amenities ?? []),
            'rules'        => json_encode(explode(',', $request->rules ?? '')),
            'cancellation' => json_encode(explode(',', $request->cancellation ?? '')),
            'neighborhood' => json_encode(explode(',', $request->neighborhood ?? '')),
            'property_type'=> json_encode($request->property_type),
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('properties.edit', $property->id)->with('success', 'Property updated successfully!');
    }

    public function destroy(string $id) {}

    public function destroyImage(PropertyImage $image)
    {
        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }
        $image->delete();
        return back()->with('success', 'Image deleted successfully');
    }

    private function transformProperty($property)
    {
        return [
            'id'        => $property->id,
            'title'     => $property->title,
            'location'  => $property->location,
            'latitude'  => (float) $property->latitude,
            'longitude' => (float) $property->longitude,
            'price'     => (float) $property->price_per_day,
            'size'      => (float) $property->size,
            'persons'   => (float) $property->max_persons,
            'bedrooms'  => (float) $property->bedrooms,
            'bathrooms' => (float) $property->bathrooms,
            'featured'  => $property->featured,
            'amenities' => $property->amenities,

            // ✅ Unified image handling
            'image'     => $property->images->first() ? asset('storage/' . $property->images->first()->image_path) : null,
            'images'    => $property->images->map(fn($img) => ['url' => asset('storage/' . $img->image_path)])->values(),
        ];
    }

        public function calendar($id)
        {
            $property = Property::findOrFail($id);
            $defaultPrice = $property->price_per_day;

            $start = now()->startOfMonth();
            $end = now()->addMonths(6)->endOfMonth();

            $dates = collect();
            $current = $start->copy();
            while ($current <= $end) {
                $dates->push($current->format('Y-m-d'));
                $current->addDay();
            }

            // ✅ Key rows by date string, not Carbon
            $customRows = \App\Models\PropertyCalendar::where('property_id', $id)
                ->whereBetween('date', [$start, $end])
                ->get()
                ->keyBy(fn($row) => $row->date->toDateString());

            $calendar = $dates->map(function ($date) use ($customRows, $defaultPrice) {
                if (isset($customRows[$date])) {
                    return [
                        'date'     => $date,
                        'price'    => $customRows[$date]->price ?? $defaultPrice,
                        'status'   => $customRows[$date]->status,
                        'min_stay' => $customRows[$date]->min_stay,
                    ];
                }

                return [
                    'date'     => $date,
                    'price'    => $defaultPrice,
                    'status'   => 'available',
                    'min_stay' => 1,
                ];
            });

            return response()->json($calendar);
        }


    public function apiIndex()
    {
        $properties = Property::with('images')->whereNotNull('latitude')->whereNotNull('longitude')->get();
        return response()->json($properties->map(fn($p) => $this->transformProperty($p)));
    }

    public function getFeaturedPropertiesCommit($feature)
    {
        $properties = Property::with('images')->where('featured', $feature)->orderBy('id', 'desc')->get();
        return $properties->map(fn($p) => $this->transformProperty($p));
    }

    public function getAllPropertiesCommit()
    {
        $properties = Property::with('images')->orderBy('id', 'desc')->get();
        return $properties->map(fn($p) => $this->transformProperty($p));
    }

    public function getLongMediumTermPropertiesCommit($type)
    {
        $properties = Property::with('images')->orderBy('id', 'desc')->get();

        $label = match ($type) {
            'long'   => 'Long Term',
            'medium' => 'Medium Term',
            default  => null,
        };

        if ($label) {
            $properties = $properties->filter(function ($property) use ($label) {
                $types = $property->property_type;
                if (is_string($types)) {
                    $decoded = json_decode($types, true);
                    $types = is_array($decoded) ? $decoded : [$types];
                } elseif (!is_array($types)) {
                    $types = [];
                }
                foreach ($types as $t) {
                    if (strcasecmp(trim((string)$t), $label) === 0) {
                        return true;
                    }
                }
                return false;
            })->values();
        }

        return $properties->map(fn($p) => $this->transformProperty($p));
    }
}
