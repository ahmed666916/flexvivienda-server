<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::orderByDesc('id')->paginate(10);
        return view('properties.index', compact('properties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('properties.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string',
            'latitude' => 'required',
            'longitude' => 'required',
            'price_per_day' => 'required|numeric',
            
            // Require at least 4 images
            'images'        => 'required|array|min:4',

            // Property types
            'property_type' => 'required|array',
           

        ]);

        $property = Property::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'size' => $request->size,
            'bedrooms' => $request->bedrooms,
            'bathrooms' => $request->bathrooms,
            'max_persons' => $request->max_persons,
            'price_per_day' => $request->price_per_day,
            'is_featured' => $request->has('featured'),
            'amenities' => $request->amenities ?? [],
            'rules' => explode(',', $request->rules ?? ''),
            'cancellation' => explode(',', $request->cancellation ?? ''),
            'neighborhood' => explode(',', $request->neighborhood ?? ''),
            'property_type' => $request->property_type ?? [],
            'status' => 'available' // default
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('properties.index')->with('success', 'Property created successfully!');
    }

    /**
     * Display the specified resource.
     */
    

        public function show($id)
        {
            $property = Property::with('images')->findOrFail($id);

            return response()->json([
            'id' => $property->id,
            'title' => $property->title,
            'location' => $property->location,
            'description' => $property->description,
            'lat' => $property->latitude,
            'lng' => $property->longitude,
            'price' => $property->price_per_day,
            'amenities' => is_array($property->amenities) ? $property->amenities : json_decode($property->amenities, true) ?? [],
            'rules' => is_array($property->rules) ? $property->rules : json_decode($property->rules, true) ?? [],
            'cancellation' => is_array($property->cancellation) ? $property->cancellation : json_decode($property->cancellation, true) ?? [],
            'neighborhood' => is_array($property->neighborhood) ? $property->neighborhood : json_decode($property->neighborhood, true) ?? [],
            'images' => $property->images->map(fn($img) => $img->full_url),
        ]);

        }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $properties = Property::find($id);
        return view('properties.edit', ['property'=>$properties]);
    }

    /**
     * Update the specified resource in storage.
     */
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
            'title'         => $request->title,
            'description'   => $request->description,
            'location'      => $request->location,
            'latitude'      => $request->latitude,
            'longitude'     => $request->longitude,
            'size'          => $request->size,
            'bedrooms'      => $request->bedrooms,
            'bathrooms'     => $request->bathrooms,
            'max_persons'   => $request->max_persons,
            'price_per_day' => $request->price_per_day,
            'featured'      => $request->has('featured'),
            'amenities'     => json_encode($request->amenities ?? []),
            'rules'         => json_encode(explode(',', $request->rules ?? '')),
            'cancellation'  => json_encode(explode(',', $request->cancellation ?? '')),
            'neighborhood'  => json_encode(explode(',', $request->neighborhood ?? '')),
            'property_type' => json_encode($request->property_type),
        ]);

        // Handle new images (optional)
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('properties.edit', $property->id)->with('success', 'Property updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function destroyImage(PropertyImage $image)
    {
        // Delete file from storage
        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        // Delete record
        $image->delete();

        return back()->with('success', 'Image deleted successfully');
    }

    public function apiIndex()
    {
        $properties = Property::with(['images' => function($q) {
            $q->limit(1); // just fetch one image for preview
        }])
        ->whereNotNull('latitude')
        ->whereNotNull('longitude')
        ->get();

        // Transform the data for frontend
        $data = $properties->map(function($property) {
            return [
                'id'          => $property->id,
                'title'       => $property->title,
                'location'    => $property->location,
                'latitude'    => (float) $property->latitude,
                'longitude'   => (float) $property->longitude,
                'price'       => $property->price_per_day,
                'image'       => $property->images->first() 
                                    ? asset('storage/' . $property->images->first()->image_path) 
                                    : null,
            ];
        });

        return response()->json($data);
    }



    public function getFeaturedPropertiesCommit($feature)
    {
        $query = Property::query();

        // ✅ filter by featured when passed
      
            $query->where('featured', $feature);
        

        // ✅ always order by id DESC
        $properties = $query->orderBy('id', 'desc')->get();

        // ✅ make sure lat/lng are floats
        return $properties->map(function ($property) {
            return [
                'id'        => $property->id,
                'title'     => $property->title,
                'location'  => $property->location,
                'latitude'  => (float) $property->latitude,
                'longitude' => (float) $property->longitude,
                'price'     => (float) $property->price_per_day,
                'size'     => (float) $property->size,
                'persons'     => (float) $property->max_persons,
                'bedrooms'     => (float) $property->bedrooms,
                'bathrooms'     => (float) $property->bathrooms,
                'image'       => $property->images->first() 
                                    ? asset('storage/' . $property->images->first()->image_path) 
                                    : null,
                'featured'  => $property->featured,
            ];
        });
    }

    public function getAllPropertiesCommit()
    {
        $query = Property::query();

        // ✅ filter by featured when passed
      
        

        // ✅ always order by id DESC
        $properties = $query->orderBy('id', 'desc')->get();

        // ✅ make sure lat/lng are floats
        return $properties->map(function ($property) {
            return [
                'id'        => $property->id,
                'title'     => $property->title,
                'location'  => $property->location,
                'latitude'  => (float) $property->latitude,
                'longitude' => (float) $property->longitude,
                'price'     => (float) $property->price_per_day,
                'size'     => (float) $property->size,
                'persons'     => (float) $property->max_persons,
                'bedrooms'     => (float) $property->bedrooms,
                'bathrooms'     => (float) $property->bathrooms,
                'image'       => $property->images->first() 
                                    ? asset('storage/' . $property->images->first()->image_path) 
                                    : null,
                'featured'  => $property->featured,
                'amenities'  => $property->amenities,
            ];
        });
    }

    public function getLongMediumTermPropertiesCommit($type)
    {
                // Example: inside your controller method where $type may be "long" or "medium"
        $properties = Property::with(['images']) // avoid N+1
            ->orderBy('id', 'desc')
            ->get();

        // Map route/query type → label stored in JSON
        $label = match ($type) {
            'long'   => 'Long Term',
            'medium' => 'Medium Term',
            default  => null, // no filtering if null/unknown
        };

        // Filter in PHP (case-insensitive, robust whether casted array or raw JSON string)
        if ($label) {
            $properties = $properties->filter(function ($property) use ($label) {
                $types = $property->property_type;

                // Ensure we have an array even if DB returns a stringified JSON
                if (is_string($types)) {
                    $decoded = json_decode($types, true);
                    $types = is_array($decoded) ? $decoded : [$types];
                } elseif (!is_array($types)) {
                    $types = []; // null or unexpected → treat as empty
                }

                // Trim and compare case-insensitively
                foreach ($types as $t) {
                    if (strcasecmp(trim((string)$t), $label) === 0) {
                        return true;
                    }
                }
                return false;
            })->values(); // reindex after filtering
        }

        // Format the response
        return $properties->map(function ($property) {
            // make sure we return property_type as an array in response
            $types = $property->property_type;
            if (is_string($types)) {
                $decoded = json_decode($types, true);
                $types = is_array($decoded) ? $decoded : [$types];
            } elseif (!is_array($types)) {
                $types = [];
            }

            return [
                'id'           => $property->id,
                'title'        => $property->title,
                'location'     => $property->location,
                'latitude'     => (float) $property->latitude,
                'longitude'    => (float) $property->longitude,
                'price'        => (float) $property->price_per_day,
                'size'         => (float) $property->size,
                'persons'      => (float) $property->max_persons,
                'bedrooms'     => (float) $property->bedrooms,
                'bathrooms'    => (float) $property->bathrooms,
                'image'        => $property->images->first()
                                    ? asset('storage/' . $property->images->first()->image_path)
                                    : null,
                'featured'     => $property->featured,
                'amenities'    => $property->amenities,
                'property_type'=> $types,
            ];
        });


    }


}
