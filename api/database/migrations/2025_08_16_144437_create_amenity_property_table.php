<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('amenity_property', function (Blueprint $table) {
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('amenity_id');

            $table->foreign('property_id')->references('id')->on('properties')->cascadeOnDelete();
            $table->foreign('amenity_id')->references('id')->on('amenities')->cascadeOnDelete();

            $table->primary(['property_id', 'amenity_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('amenity_property');
    }
};

