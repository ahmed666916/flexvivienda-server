<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
        public function up()
        {
            Schema::table('properties', function (Blueprint $table) {
                $table->json('amenities')->nullable()->change();
                $table->json('rules')->nullable()->change();
                $table->json('cancellation')->nullable()->change();
                $table->json('neighborhood')->nullable()->change();
            });
        }

        public function down()
        {
            Schema::table('properties', function (Blueprint $table) {
                $table->text('amenities')->nullable()->change();
                $table->text('rules')->nullable()->change();
                $table->text('cancellation')->nullable()->change();
                $table->text('neighborhood')->nullable()->change();
            });
        }

};
