<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('external_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->date('check_in');
            $table->date('check_out');
            $table->string('source')->default('airbnb'); // e.g. airbnb, booking.com, vrbo
            $table->string('external_id')->nullable(); // iCal UID or OTA ID
            $table->timestamps();

            $table->unique(['property_id', 'check_in', 'check_out', 'source'], 'unique_external_booking');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('external_bookings');
    }
};
