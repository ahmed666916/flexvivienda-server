<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        Schema::table('stay_types', function (Blueprint $table) {
            if (!Schema::hasColumn('stay_types','slug')) {
                $table->string('slug')->unique()->nullable()->after('id');
            }
        });
        // Backfill slug = code
        DB::table('stay_types')->update(['slug' => DB::raw('code')]);
        // Ensure NOT NULL after backfill (optional, safe if your DB supports it)
        try { DB::statement("ALTER TABLE stay_types MODIFY slug VARCHAR(255) NOT NULL"); } catch (\Throwable $e) {}
    }
    public function down(): void {
        Schema::table('stay_types', function (Blueprint $table) {
            if (Schema::hasColumn('stay_types','slug')) {
                $table->dropUnique(['slug']);
                $table->dropColumn('slug');
            }
        });
    }
};
