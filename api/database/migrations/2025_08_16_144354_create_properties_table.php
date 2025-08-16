<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->nullable()->constrained('owners')->nullOnDelete();
            $table->foreignId('city_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('address')->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->unsignedTinyInteger('bedrooms')->nullable();
            $table->unsignedTinyInteger('beds')->nullable();
            $table->unsignedTinyInteger('bathrooms')->nullable();
            $table->unsignedSmallInteger('max_guests')->nullable();
            $table->integer('price_per_night')->nullable(); // base price
            $table->char('base_currency', 3)->default('EUR');
            $table->boolean('is_featured')->default(false);
            $table->enum('listing_source', ['manual','airbnb','booking','other'])->default('manual');
            $table->enum('status', ['draft','pending','published','blocked'])->default('draft');
            $table->json('raw')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('properties');
    }
};
