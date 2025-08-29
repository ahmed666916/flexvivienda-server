<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location'); // e.g., "Muğla, Bodrum"
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->integer('size')->nullable(); // m²
            $table->integer('bedrooms')->default(0);
            $table->integer('bathrooms')->default(0);
            $table->integer('max_persons')->default(1);
            $table->decimal('price_per_day', 10, 2);
            $table->boolean('featured')->default(false);
            $table->json('amenities')->nullable(); // store as array (wifi, pool, etc.)
            $table->json('rules')->nullable();     // smoking, pets, etc.
            $table->json('cancellation')->nullable();
            $table->json('neighborhood')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
