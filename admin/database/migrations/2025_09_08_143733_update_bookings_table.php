<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Add new API booking fields if not already present
            if (!Schema::hasColumn('bookings', 'user_id')) {
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            }

            if (!Schema::hasColumn('bookings', 'property_id')) {
                $table->foreignId('property_id')->nullable()->constrained()->onDelete('cascade');
            }

            if (!Schema::hasColumn('bookings', 'check_in')) {
                $table->date('check_in')->nullable();
            }

            if (!Schema::hasColumn('bookings', 'check_out')) {
                $table->date('check_out')->nullable();
            }

            if (!Schema::hasColumn('bookings', 'status')) {
                $table->enum('status', ['active', 'canceled'])->default('active');
            }
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['property_id']);
            $table->dropColumn(['user_id', 'property_id', 'check_in', 'check_out', 'status']);
        });
    }
};
