<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Step 1: expand enum first
        DB::statement("
            ALTER TABLE properties
            MODIFY status ENUM('available','booked','pending','approved','rejected','archived') 
            NOT NULL DEFAULT 'pending'
        ");

        // Step 2: convert old values to new equivalents
        DB::statement("UPDATE properties SET status='approved' WHERE status='available'");
        DB::statement("UPDATE properties SET status='archived' WHERE status='booked'");

        // Step 3: tighten enum to final set (remove old ones)
        DB::statement("
            ALTER TABLE properties
            MODIFY status ENUM('pending','approved','rejected','archived') 
            NOT NULL DEFAULT 'pending'
        ");
    }

    public function down(): void
    {
        // Revert enum back to old values
        DB::statement("
            ALTER TABLE properties
            MODIFY status ENUM('available','booked') NOT NULL DEFAULT 'available'
        ");
    }
};
