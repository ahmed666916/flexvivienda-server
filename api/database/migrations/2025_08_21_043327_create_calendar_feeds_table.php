<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('calendar_feeds', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->string('platform'); // airbnb|booking|google|other
            $t->string('ical_url');
            $t->timestamp('last_sync_at')->nullable();
            $t->json('meta')->nullable();
            $t->timestamps();
            $t->unique(['property_id','platform']);
        });
    }
    public function down(): void { Schema::dropIfExists('calendar_feeds'); }
};
