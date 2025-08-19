// database/migrations/2025_08_19_000300_create_properties_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('properties', function (Blueprint $t) {
            $t->id();
            $t->foreignId('owner_id')->nullable()->constrained()->nullOnDelete();
            $t->foreignId('city_id')->nullable()->constrained()->nullOnDelete();

            $t->string('title');
            $t->string('slug')->unique();
            $t->text('description')->nullable();

            $t->string('address_line')->nullable();
            $t->decimal('lat', 10, 7)->nullable();
            $t->decimal('lng', 10, 7)->nullable();

            $t->unsignedTinyInteger('bedrooms')->default(0);
            $t->unsignedTinyInteger('bathrooms')->default(0);
            $t->unsignedTinyInteger('max_guests')->default(1);

            $t->string('currency', 3)->default('EUR');
            $t->decimal('price_per_night', 10, 2)->nullable();
            $t->decimal('price_per_month', 10, 2)->nullable();

            // flow control
            $t->enum('status', ['draft','pending_review','published','rejected','archived'])->default('draft');
            $t->boolean('is_featured')->default(false);

            // channel/sync
            $t->enum('listing_source', ['manual','airbnb','booking'])->default('manual');
            $t->string('external_id')->nullable()->index();  // airbnb id/url hash

            // booking options
            $t->boolean('require_manual_approval')->default(false);

            $t->float('rating_avg', 3, 2)->nullable();
            $t->unsignedInteger('rating_count')->default(0);

            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('properties'); }
};
