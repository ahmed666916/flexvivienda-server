<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('stay_types', function (Blueprint $table) {
            $table->id();
            $table->enum('code', ['short','mid','long'])->unique();
            $table->string('name');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('stay_types');
    }
};
