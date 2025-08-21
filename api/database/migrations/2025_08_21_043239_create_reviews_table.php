<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('reviews', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $t->unsignedTinyInteger('rating')->default(5);
            $t->text('comment')->nullable();
            $t->boolean('is_public')->default(true);
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('reviews'); }
};
