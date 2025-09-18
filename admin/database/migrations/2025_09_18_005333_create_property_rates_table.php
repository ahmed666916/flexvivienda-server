<?php

// database/migrations/2025_09_17_020100_create_property_rates_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('property_rates', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->enum('stay_type', ['short','mid','long']);  // < 30, 30-89, 90+
            $t->unsignedInteger('min_nights')->default(1);
            $t->unsignedInteger('max_nights')->nullable(); // null = open ended
            $t->decimal('price', 10, 2);                   // nightly or per-stay unit
            $t->json('rules')->nullable();                 // weekend %, min advance, etc.
            $t->timestamps();
            $t->unique(['property_id','stay_type']);
        });
    }
    public function down(): void { Schema::dropIfExists('property_rates'); }
};
