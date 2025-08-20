<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('bookings', function (Blueprint $t) {
            if (!Schema::hasColumn('bookings','ref')) $t->string('ref', 32)->nullable()->unique()->after('id');
        });
    }
    public function down(): void {
        Schema::table('bookings', function (Blueprint $t) {
            if (Schema::hasColumn('bookings','ref')) $t->dropColumn('ref');
        });
    }
};
