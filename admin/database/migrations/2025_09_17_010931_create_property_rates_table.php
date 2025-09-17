<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('property_rates', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->enum('mode', ['short','mid','long'])->index();
            $t->decimal('price_per_night', 10, 2)->default(0);
            $t->unsignedInteger('min_nights')->default(1);
            $t->timestamps();
            $t->unique(['property_id','mode']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_rates');
    }
};
