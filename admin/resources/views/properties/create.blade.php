@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Add Property</h4>
        </div>
        <div class="card-body">

             {{-- Success Message --}}
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            {{-- Error Messages --}}
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            <form method="POST" action="{{ route('properties.store') }}" enctype= multipart/form-data>
                @csrf

                <!-- Title -->
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" name="title" class="form-control" required>
                </div>

                <!-- Description -->
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="3"></textarea>
                </div>

                <!-- Location -->
                <div class="mb-3">
                    <label class="form-label">Location (Search in Turkey)</label>
                    <input type="text" id="locationInput" name="location" class="form-control" required>
                    <input type="hidden" id="latitude" name="latitude">
                    <input type="hidden" id="longitude" name="longitude">
                </div>

                <!-- Numbers Row -->
                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Size (m²)</label>
                        <input type="number" name="size" class="form-control">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Bedrooms</label>
                        <input type="number" name="bedrooms" value="0" class="form-control">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Bathrooms</label>
                        <input type="number" name="bathrooms" value="0" class="form-control">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Max Persons</label>
                        <input type="number" name="max_persons" value="1" class="form-control">
                    </div>
                </div>

                <!-- Price -->
                <div class="mb-3">
                    <label class="form-label">Price per Day</label>
                    <input type="number" step="0.01" name="price_per_day" class="form-control" required>
                </div>

                <!-- Featured -->
                <div class="form-check mb-3">
                    <input type="checkbox" name="featured" value="1" id="featuredCheck" class="form-check-input">
                    <label for="featuredCheck" class="form-check-label">Featured</label>
                </div>

                <!-- Amenities -->
                <div class="mb-3">
                    <label class="form-label">Amenities</label>
                    <div class="row">
                        @php
                            $allAmenities = [
                                'Sea view', 'Swimming Pool', 'Garden', 'Close to Beach',
                                'Pet friendly', 'Residence', 'Central', 'Jacuzzi', 'Hair dryer', 'Shampoo', 'Body soap', 'Hot water', 'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Iron', 'Clothing storage', 'TV', 'Air conditioning', 'Smoke alarm', 'Fire extinguisher', 'First aid kit', 'Wifi, Dedicated workspace', 'Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Dishwasher', 'Stove', 'Hot water kettle', 'Wine glasses', 'Dining table', 'Coffee', 'Elevator', 
                            ];
                        @endphp
                        @foreach($allAmenities as $amenity)
                            <div class="col-md-3">
                                <div class="form-check">
                                    <input type="checkbox" name="amenities[]" value="{{ $amenity }}" 
                                           id="amenity_{{ $loop->index }}" class="form-check-input">
                                    <label for="amenity_{{ $loop->index }}" class="form-check-label">
                                        {{ $amenity }}
                                    </label>
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
                    <input type="hidden" name="rules" id="rulesHidden">
                </div>

                <!-- Cancellation -->
                <div class="mb-3">
                    <label class="form-label">Cancellation Policy</label>
                    <input type="text" id="cancellationInput" class="form-control" placeholder="Type and press Enter or ,">
                    <div id="cancellationTags" class="mt-2"></div>
                    <input type="hidden" name="cancellation" id="cancellationHidden">
                </div>

                <!-- Neighborhood -->
                <div class="mb-3">
                    <label class="form-label">Neighborhood Info</label>
                    <input type="text" id="neighborhoodInput" class="form-control" placeholder="Type and press Enter or ,">
                    <div id="neighborhoodTags" class="mt-2"></div>
                    <input type="hidden" name="neighborhood" id="neighborhoodHidden">
                </div>

                <!-- Property Type -->
                <div class="mb-3">
                    <label class="form-label">Property Type</label>
                    <div class="row">
                        @php
                            $types = ['short_term' => 'Short Term', 'medium_term' => 'Medium Term', 'long_term' => 'Long Term'];
                        @endphp
                        @foreach($types as $value => $label)
                            <div class="col-md-3">
                                <div class="form-check">
                                    <input type="checkbox" name="property_type[]" value="{{ $value }}" 
                                           id="ptype_{{ $value }}" class="form-check-input">
                                    <label for="ptype_{{ $value }}" class="form-check-label">{{ $label }}</label>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <!-- Images Upload -->
                <div class="mb-3">
                    <label class="form-label">Property Images (min 4)</label>
                    <input type="file" name="images[]" class="form-control" multiple required>
                    <small class="text-muted">Upload at least 4 images (jpg, png, max 2MB each)</small>
                </div>


                <!-- Submit -->
                <div class="text-end">
                    <button type="submit" class="btn btn-lg btn-primary">Save Property</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
{{-- Google Autocomplete --}}
<script>
function initAutocomplete() {
    const input = document.getElementById('locationInput');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "tr" },
        fields: ["formatted_address", "geometry"]
    });
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        document.getElementById('latitude').value = place.geometry.location.lat();
        document.getElementById('longitude').value = place.geometry.location.lng();
    });
}
window.initAutocomplete = initAutocomplete;
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9Fz5z9lHcRgsU7V1XUh1-74VVbxudfEU&libraries=places&callback=initAutocomplete" async defer></script>

{{-- Tags Input --}}
<script>
function setupTags(inputId, tagsDivId, hiddenId) {
    const input = document.getElementById(inputId);
    const tagsDiv = document.getElementById(tagsDivId);
    const hidden = document.getElementById(hiddenId);
    let tags = [];

    function renderTags() {
        tagsDiv.innerHTML = "";
        tags.forEach((tag, idx) => {
            const span = document.createElement("span");
            span.className = "badge bg-primary me-1";
            span.innerHTML = tag + ` <span style="cursor:pointer" data-idx="${idx}">&times;</span>`;
            tagsDiv.appendChild(span);
        });
        hidden.value = tags.join(",");
    }

    input.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const val = input.value.trim();
            if (val && !tags.includes(val)) {
                tags.push(val);
                renderTags();
            }
            input.value = "";
        }
    });

    tagsDiv.addEventListener("click", e => {
        if (e.target.dataset.idx !== undefined) {
            tags.splice(e.target.dataset.idx, 1);
            renderTags();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupTags("rulesInput", "rulesTags", "rulesHidden");
    setupTags("cancellationInput", "cancellationTags", "cancellationHidden");
    setupTags("neighborhoodInput", "neighborhoodTags", "neighborhoodHidden");
});
</script>
@endsection
