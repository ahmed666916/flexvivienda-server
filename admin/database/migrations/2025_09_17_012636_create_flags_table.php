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
            Schema::create('flags', function (Blueprint $t) {
                $t->id();
                $t->morphs('flaggable'); // booking/user/property
                $t->foreignId('raised_by')->nullable()->constrained('users')->nullOnDelete();
                $t->string('reason');
                $t->text('notes')->nullable();
                $t->enum('status',['open','reviewing','resolved'])->default('open');
                $t->timestamps();
            });
        }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flags');
    }
};
