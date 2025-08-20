<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('property_stay_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
            $table->foreignId('stay_type_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('min_nights')->nullable();
            $table->unsignedSmallInteger('max_nights')->nullable();
            $table->unsignedSmallInteger('min_months')->nullable();
            $table->unsignedSmallInteger('max_months')->nullable();
            $table->integer('monthly_rate')->nullable();
            $table->integer('deposit_amount')->nullable();
            $table->boolean('contract_required')->default(false);
            $table->timestamps();
            $table->unique(['property_id','stay_type_id']);
        });
    }
    public function down(): void {
        Schema::dropIfExists('property_stay_types');
    }
};
