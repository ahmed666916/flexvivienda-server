<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('property_calendar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->decimal('price', 10, 2)->nullable(); // per-night price
            $table->enum('status', ['available', 'booked', 'blocked'])->default('available');
            $table->unsignedInteger('min_stay')->default(1); // nights required
            $table->timestamps();

            $table->unique(['property_id', 'date']); // one row per property per day
        });
    }

    public function down()
    {
        Schema::dropIfExists('property_calendar');
    }
};
