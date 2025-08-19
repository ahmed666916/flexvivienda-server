// database/migrations/2025_08_19_000500_create_amenities_categories_stays.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('amenities', function (Blueprint $t) {
            $t->id();
            $t->string('name')->unique(); // Wi‑Fi, Pool, Parking, etc.
            $t->timestamps();
        });
        Schema::create('categories', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->enum('kind', ['location','thematic'])->default('thematic'); // e.g., "Kaş" (location), "Sea View" (thematic)
            $t->string('slug')->unique();
            $t->timestamps();
        });
        Schema::create('stay_types', function (Blueprint $t) {
            $t->id();
            $t->string('name');      // Short / Mid / Long
            $t->string('slug')->unique(); // short / mid / long
            $t->unsignedSmallInteger('min_nights')->default(1);
            $t->unsignedSmallInteger('max_nights')->nullable(); // null = unlimited
            $t->timestamps();
        });
        Schema::create('amenity_property', function (Blueprint $t) {
            $t->id();
            $t->foreignId('amenity_id')->constrained()->cascadeOnDelete();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->unique(['amenity_id','property_id']);
        });
        Schema::create('category_property', function (Blueprint $t) {
            $t->id();
            $t->foreignId('category_id')->constrained()->cascadeOnDelete();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->unique(['category_id','property_id']);
        });
        Schema::create('property_stay_type', function (Blueprint $t) {
            $t->id();
            $t->foreignId('stay_type_id')->constrained()->cascadeOnDelete();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->unique(['stay_type_id','property_id']);
        });
    }
    public function down(): void {
        Schema::dropIfExists('property_stay_type');
        Schema::dropIfExists('category_property');
        Schema::dropIfExists('amenity_property');
        Schema::dropIfExists('stay_types');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('amenities');
    }
};
