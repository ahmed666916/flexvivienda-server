// database/migrations/2025_08_19_000200_create_cities_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cities', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('region')->nullable(); // Istanbul / Antalya / etc
            $t->string('country')->default('Turkey'); // adjust as needed
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('cities'); }
};
