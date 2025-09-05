@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-warning text-dark">
            <h4 class="mb-0">Edit Property</h4>
        </div>
        <div class="card-body">

            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form method="POST" action="{{ route('properties.update', $property->id) }}" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <!-- Title -->
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" name="title" class="form-control" value="{{ old('title', $property->title) }}" required>
                </div>

                <!-- Description -->
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="3">{{ old('description', $property->description) }}</textarea>
                </div>

                <!-- Location -->
                <div class="mb-3">
                    <label class="form-label">Location (Search in Turkey)</label>
                    <input type="text" id="locationInput" name="location" class="form-control"
                           value="{{ old('location', $property->location) }}" required>
                    <input type="hidden" id="latitude" name="latitude" value="{{ old('latitude', $property->latitude) }}">
                    <input type="hidden" id="longitude" name="longitude" value="{{ old('longitude', $property->longitude) }}">
                </div>

                <!-- Map Picker -->
                <div class="mb-3">
                    <label class="form-label d-block">Pin Exact Location</label>
                    <div id="mapPicker" style="height: 320px; border-radius: 8px; overflow: hidden;"></div>
                    <small class="text-muted">Click/drag the pin to update coordinates.</small>
                </div>

                <!-- Numbers Row -->
                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Size (m²)</label>
                        <input type="number" name="size" class="form-control" value="{{ old('size', $property->size) }}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Bedrooms</label>
                        <input type="number" name="bedrooms" class="form-control" value="{{ old('bedrooms', $property->bedrooms) }}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Bathrooms</label>
                        <input type="number" name="bathrooms" class="form-control" value="{{ old('bathrooms', $property->bathrooms) }}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Max Persons</label>
                        <input type="number" name="max_persons" class="form-control" value="{{ old('max_persons', $property->max_persons) }}">
                    </div>
                </div>

                <!-- Price -->
                <div class="mb-3">
                    <label class="form-label">Price per Day</label>
                    <input type="number" step="0.01" name="price_per_day" class="form-control"
                           value="{{ old('price_per_day', $property->price_per_day) }}" required>
                </div>

                <!-- Featured -->
                <div class="form-check mb-3">
                    <input type="checkbox" name="featured" value="1" id="featuredCheck"
                           class="form-check-input" {{ old('featured', $property->featured) ? 'checked' : '' }}>
                    <label for="featuredCheck" class="form-check-label">Featured</label>
                </div>

                <!-- Property Type -->
                <div class="mb-3">
                    <label class="form-label">Property Type</label><br>
                    @php
                        $types = ['Short Term', 'Medium Term', 'Long Term'];
                        $selectedTypes = old('property_type', is_array($property->property_type) ? $property->property_type : json_decode($property->property_type, true) ?? []);
                    @endphp
                    @foreach($types as $type)
                        <div class="form-check form-check-inline">
                            <input type="checkbox" name="property_type[]" value="{{ $type }}"
                                   class="form-check-input"
                                   {{ in_array($type, $selectedTypes) ? 'checked' : '' }}>
                            <label class="form-check-label">{{ $type }}</label>
                        </div>
                    @endforeach
                </div>

                <!-- Amenities -->
                <div class="mb-3">
                    <label class="form-label">Amenities</label>
                    <div class="row">
                        @php
                            $allAmenities = [
                                'Sea view','Swimming Pool','Garden','Close to Beach','Pet friendly','Residence','Central','Jacuzzi',
                                'Hair dryer','Shampoo','Body soap','Hot water','Shower gel','Hangers','Bed linens','Extra pillows and blankets',
                                'Iron','Clothing storage','TV','Air conditioning','Smoke alarm','Fire extinguisher','First aid kit',
                                'Wifi, Dedicated workspace','Kitchen','Refrigerator','Microwave','Cooking basics','Dishes and silverware',
                                'Dishwasher','Stove','Hot water kettle','Wine glasses','Dining table','Coffee','Elevator',
                            ];
                            $selectedAmenities = old('amenities', is_array($property->amenities) ? $property->amenities : json_decode($property->amenities, true) ?? []);
                        @endphp
                        @foreach($allAmenities as $amenity)
                            <div class="col-md-3">
                                <div class="form-check">
                                    <input type="checkbox" name="amenities[]" value="{{ $amenity }}"
                                           id="amenity_{{ $loop->index }}" class="form-check-input"
                                           {{ in_array($amenity, $selectedAmenities) ? 'checked' : '' }}>
                                    <label for="amenity_{{ $loop->index }}" class="form-check-label">{{ $amenity }}</label>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <!-- Rules -->
                <div class="mb-3">
                    <label class="form-label">Rules</label>
                    <input type="text" id="rulesInput" class="form-control" placeholder="Type and press Enter or ,">
                    <div id="rulesTags" class="mt-2"></div>
                    @php
                        $rulesVal = old('rules', is_array($property->rules) ? implode(',', $property->rules) : implode(',', json_decode($property->rules, true) ?? []));
                    @endphp
                    <input type="hidden" name="rules" id="rulesHidden" value="{{ $rulesVal }}">
                </div>

                <!-- Cancellation -->
                <div class="mb-3">
                    <label class="form-label">Cancellation Policy</label>
                    <input type="text" id="cancellationInput" class="form-control" placeholder="Type and press Enter or ,">
                    <div id="cancellationTags" class="mt-2"></div>
                    @php
                        $cancellationVal = old('cancellation', is_array($property->cancellation) ? implode(',', $property->cancellation) : implode(',', json_decode($property->cancellation, true) ?? []));
                    @endphp
                    <input type="hidden" name="cancellation" id="cancellationHidden" value="{{ $cancellationVal }}">
                </div>

                <!-- Neighborhood -->
                <div class="mb-3">
                    <label class="form-label">Neighborhood Info</label>
                    <input type="text" id="neighborhoodInput" class="form-control" placeholder="Type and press Enter or ,">
                    <div id="neighborhoodTags" class="mt-2"></div>
                    @php
                        $neighborhoodVal = old('neighborhood', is_array($property->neighborhood) ? implode(',', $property->neighborhood) : implode(',', json_decode($property->neighborhood, true) ?? []));
                    @endphp
                    <input type="hidden" name="neighborhood" id="neighborhoodHidden" value="{{ $neighborhoodVal }}">
                </div>

                <!-- Images -->
                <div class="mb-3">
                    <label class="form-label">Property Images</label>
                    <input type="file" name="images[]" class="form-control" multiple>
                    <small class="text-muted">Upload at least 4 images (jpg, jpeg, png). Leave empty to keep existing.</small>
                </div>

                <!-- Submit -->
                <div class="text-end">
                    <button type="submit" class="btn btn-lg btn-warning">Update Property</button>
                </div>
            </form>

            <!-- Thumbnails + delete -->
            <div class="mt-3 d-flex flex-wrap">
                @foreach($property->images as $image)
                    <div class="position-relative me-2 mb-2" style="display:inline-block;">
                        <img src="{{ Storage::url($image->image_path) }}" alt="Property Image" class="img-thumbnail" width="120">
                        <form action="{{ route('properties.images.destroy', $image->id) }}" method="POST" style="position:absolute; top:2px; right:2px;">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this image?')">&times;</button>
                        </form>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<!-- Google Autocomplete -->
<script>
function initAutocomplete() {
    const input = document.getElementById('locationInput');
    if (!input) return;
    const autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "tr" },
        fields: ["formatted_address", "geometry"]
    });
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;
        if (window.__leafletMarker && window.__leafletMap) {
            window.__leafletMarker.setLatLng([lat, lng]);
            window.__leafletMap.setView([lat, lng], 15);
        }
    });
}
window.initAutocomplete = initAutocomplete;
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9Fz5z9lHcRgsU7V1XUh1-74VVbxudfEU&libraries=places&callback=initAutocomplete" async defer></script>

<!-- Leaflet (map picker) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const lat = parseFloat(document.getElementById('latitude').value || '41.015137');
    const lng = parseFloat(document.getElementById('longitude').value || '28.97953');

    const map = L.map('mapPicker').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

    const marker = L.marker([lat, lng], {draggable: true}).addTo(map);

    function updateLatLng(latlng) {
        document.getElementById('latitude').value = latlng.lat.toFixed(6);
        document.getElementById('longitude').value = latlng.lng.toFixed(6);
    }

    marker.on('dragend', (e) => updateLatLng(e.target.getLatLng()));
    map.on('click', (e) => { marker.setLatLng(e.latlng); updateLatLng(e.latlng); });

    window.__leafletMap = map;
    window.__leafletMarker = marker;
});
</script>

<!-- Tags Input -->
<script>
function setupTags(inputId, tagsDivId, hiddenId, existing) {
    const input = document.getElementById(inputId);
    const tagsDiv = document.getElementById(tagsDivId);
    const hidden = document.getElementById(hiddenId);
    let tags = existing ? existing.split(",").filter(Boolean) : [];

    function renderTags() {
        tagsDiv.innerHTML = "";
        hidden.value = tags.join(",");
        tags.forEach((tag, idx) => {
            const span = document.createElement("span");
            span.className = "badge bg-primary me-1";
            span.innerHTML = tag + ` <span style="cursor:pointer" data-idx="${idx}">&times;</span>`;
            tagsDiv.appendChild(span);
        });
    }

    input.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const val = input.value.trim();
            if (val && !tags.includes(val)) { tags.push(val); renderTags(); }
            input.value = "";
        }
    });

    tagsDiv.addEventListener("click", e => {
        if (e.target.dataset.idx !== undefined) {
            tags.splice(e.target.dataset.idx, 1);
            renderTags();
        }
    });

    renderTags();
}

document.addEventListener("DOMContentLoaded", () => {
    setupTags("rulesInput", "rulesTags", "rulesHidden", document.getElementById("rulesHidden").value);
    setupTags("cancellationInput", "cancellationTags", "cancellationHidden", document.getElementById("cancellationHidden").value);
    setupTags("neighborhoodInput", "neighborhoodTags", "neighborhoodHidden", document.getElementById("neighborhoodHidden").value);
});
</script>
@endsection
