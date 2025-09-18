<?php

// database/migrations/2025_09_17_020200_create_flags_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('flags', function (Blueprint $t) {
            $t->id();
            $t->morphs('flaggable'); // property, user, booking
            $t->foreignId('raised_by')->nullable()->constrained('users')->nullOnDelete();
            $t->string('reason');
            $t->text('notes')->nullable();
            $t->enum('status',['open','reviewing','resolved','dismissed'])->default('open');
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('flags'); }
};
