// database/migrations/2025_08_19_000600_create_bookings_availability_submissions.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('bookings', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $t->date('start_date');
            $t->date('end_date');
            $t->unsignedSmallInteger('guests')->default(1);
            $t->decimal('total_price', 10, 2)->nullable();
            $t->enum('status', ['pending','confirmed','cancelled','awaiting_admin'])->default('pending');
            $t->enum('payment_status', ['unpaid','paid','refunded'])->default('unpaid');
            $t->enum('channel', ['direct','airbnb','booking'])->default('direct');
            $t->timestamps();
            $t->index(['property_id','start_date','end_date']);
        });

        Schema::create('availability_blocks', function (Blueprint $t) {
            $t->id();
            $t->foreignId('property_id')->constrained()->cascadeOnDelete();
            $t->date('start_date');
            $t->date('end_date');
            $t->enum('kind', ['blocked','available'])->default('blocked');
            $t->enum('source', ['manual','airbnb','booking'])->default('manual');
            $t->timestamps();
        });

        // When owners submit a property for review (or edit an existing one)
        Schema::create('property_submissions', function (Blueprint $t) {
            $t->id();
            $t->foreignId('owner_id')->constrained()->cascadeOnDelete();
            $t->foreignId('property_id')->nullable()->constrained()->nullOnDelete(); // null = new property
            $t->json('payload');      // snapshot of the form data
            $t->enum('status', ['pending','approved','rejected'])->default('pending');
            $t->text('admin_note')->nullable();
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('property_submissions');
        Schema::dropIfExists('availability_blocks');
        Schema::dropIfExists('bookings');
    }
};
