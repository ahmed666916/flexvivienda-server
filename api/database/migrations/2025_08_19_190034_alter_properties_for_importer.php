<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Make owner_id nullable without DBAL (safe even if already nullable)
        if (Schema::hasColumn('properties', 'owner_id')) {
            // Try to set NULLABLE; if it already is, this will do nothing harmful
            try {
                DB::statement('ALTER TABLE properties MODIFY owner_id BIGINT UNSIGNED NULL');
            } catch (\Throwable $e) {
                // ignore if not needed / different type; goal is just "nullable"
            }
        }

        // Add columns if missing (no ->change() calls here)
        Schema::table('properties', function (Blueprint $t) {
            if (!Schema::hasColumn('properties', 'city_id')) {
                $t->foreignId('city_id')->nullable()->constrained()->nullOnDelete();
            }
            if (!Schema::hasColumn('properties', 'slug')) {
                $t->string('slug')->unique()->nullable();
            }
            if (!Schema::hasColumn('properties', 'description')) {
                $t->text('description')->nullable();
            }
            if (!Schema::hasColumn('properties', 'address_line')) {
                $t->string('address_line')->nullable();
            }
            if (!Schema::hasColumn('properties', 'lat')) {
                $t->decimal('lat', 10, 6)->nullable();
            }
            if (!Schema::hasColumn('properties', 'lng')) {
                $t->decimal('lng', 10, 6)->nullable();
            }
            if (!Schema::hasColumn('properties', 'bedrooms')) {
                $t->unsignedTinyInteger('bedrooms')->nullable();
            }
            if (!Schema::hasColumn('properties', 'bathrooms')) {
                $t->unsignedTinyInteger('bathrooms')->nullable();
            }
            if (!Schema::hasColumn('properties', 'max_guests')) {
                $t->unsignedTinyInteger('max_guests')->nullable();
            }
            if (!Schema::hasColumn('properties', 'currency')) {
                $t->string('currency', 3)->default('EUR');
            }
            if (!Schema::hasColumn('properties', 'price_per_night')) {
                $t->decimal('price_per_night', 10, 2)->nullable();
            }
            if (!Schema::hasColumn('properties', 'price_per_month')) {
                $t->decimal('price_per_month', 10, 2)->nullable();
            }
            if (!Schema::hasColumn('properties', 'status')) {
                $t->enum('status', ['draft','pending','published','archived'])->default('published');
            }
            if (!Schema::hasColumn('properties', 'is_featured')) {
                $t->boolean('is_featured')->default(false);
            }
            if (!Schema::hasColumn('properties', 'listing_source')) {
                $t->string('listing_source')->nullable()->index();
            }
            if (!Schema::hasColumn('properties', 'external_id')) {
                $t->string('external_id')->nullable()->index();
            }
            if (!Schema::hasColumn('properties', 'raw')) {
                $t->json('raw')->nullable();
            }
        });

        // Add unique index on (listing_source, external_id) if not present — without Doctrine
        $hasIndex = DB::table('information_schema.statistics')
            ->whereRaw('table_schema = DATABASE()')
            ->where('table_name', 'properties')
            ->where('index_name', 'uniq_source_ext')
            ->exists();

        if (! $hasIndex) {
            Schema::table('properties', function (Blueprint $t) {
                $t->unique(['listing_source','external_id'], 'uniq_source_ext');
            });
        }
    }

    public function down(): void
    {
        // Drop the unique index if it exists
        $hasIndex = DB::table('information_schema.statistics')
            ->whereRaw('table_schema = DATABASE()')
            ->where('table_name', 'properties')
            ->where('index_name', 'uniq_source_ext')
            ->exists();

        if ($hasIndex) {
            Schema::table('properties', function (Blueprint $t) {
                $t->dropUnique('uniq_source_ext');
            });
        }

        // Optionally drop extra columns (keep it minimal to avoid data loss)
        Schema::table('properties', function (Blueprint $t) {
            foreach ([
                'address_line','raw','currency','price_per_night','price_per_month',
                'is_featured','status'
            ] as $col) {
                if (Schema::hasColumn('properties', $col)) {
                    $t->dropColumn($col);
                }
            }
        });
    }
};
