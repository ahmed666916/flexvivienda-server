<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void {
        Schema::table('properties', function (Blueprint $table) {
            $table->string('external_id')->nullable()->after('slug');
            $table->unique(['listing_source', 'external_id']); // composite unique
        });
    }
    public function down(): void {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropUnique('properties_listing_source_external_id_unique');
            $table->dropColumn('external_id');
        });
    }
};
