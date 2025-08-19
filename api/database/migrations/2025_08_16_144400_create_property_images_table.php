// database/migrations/2025_08_19_000400_create_property_images_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('property_images', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->string('url');           // store absolute or storage path
            $t->string('caption')->nullable();
            $t->unsignedSmallInteger('sort_order')->default(0);
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('property_images'); }
};
