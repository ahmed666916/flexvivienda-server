<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('properties', function (Blueprint $table) {
            // only add if not already existing
            $table->unique(['listing_source', 'external_id'], 'uniq_source_ext');
        });
    }

    public function down(): void {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropUnique('uniq_source_ext');
        });
    }
};
