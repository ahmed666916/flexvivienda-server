// database/migrations/2025_08_19_000100_create_owners_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('owners', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $t->string('company_name')->nullable();
            $t->string('tax_id')->nullable();
            $t->string('iban')->nullable();
            $t->json('payout_prefs')->nullable(); // bank/paypal/etc
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('owners'); }
};
