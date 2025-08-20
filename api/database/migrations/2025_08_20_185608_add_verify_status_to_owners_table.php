<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('owners', function (Blueprint $table) {
            // Only add if missing, and don't assume payout_prefs exists
            if (!Schema::hasColumn('owners', 'verified')) {
                // Choose any column that actually exists on your table, or omit ->after()
                $table->boolean('verified')->default(false); // ->after('updated_at') is fine if that column exists
            }
        });
    }

    public function down(): void
    {
        Schema::table('owners', function (Blueprint $table) {
            if (Schema::hasColumn('owners', 'verified')) {
                $table->dropColumn('verified');
            }
        });
    }
};
