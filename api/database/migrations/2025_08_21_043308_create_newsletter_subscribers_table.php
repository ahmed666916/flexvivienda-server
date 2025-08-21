<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('newsletter_subscribers', function (Blueprint $t) {
            $t->id();
            $t->string('email')->unique();
            $t->json('meta')->nullable(); // tags, source, language
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('newsletter_subscribers'); }
};
