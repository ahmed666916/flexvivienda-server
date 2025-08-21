<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('owner_leads', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('email')->nullable();
            $t->string('phone')->nullable();
            $t->string('property_type')->nullable();
            $t->unsignedTinyInteger('bedrooms')->nullable();
            $t->unsignedTinyInteger('bathrooms')->nullable();
            $t->string('city')->nullable();
            $t->string('address')->nullable();
            $t->json('photos')->nullable();
            $t->text('notes')->nullable();
            $t->enum('status', ['new','contacted','qualified','rejected','converted'])->default('new');
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('owner_leads'); }
};
