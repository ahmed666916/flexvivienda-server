<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Only add the unique index if BOTH columns exist
        if (
            Schema::hasColumn('properties', 'listing_source') &&
            Schema::hasColumn('properties', 'external_id')
        ) {
            Schema::table('properties', function (Blueprint $table) {
                // Will be a no-op if the exact index already exists (see guard below)
                if (!$this->indexExists('properties', 'uniq_source_ext')) {
                    $table->unique(['listing_source', 'external_id'], 'uniq_source_ext');
                }
            });
        }
    }

    public function down(): void
    {
        // Drop only if it exists
        if ($this->indexExists('properties', 'uniq_source_ext')) {
            Schema::table('properties', function (Blueprint $table) {
                $table->dropUnique('uniq_source_ext');
            });
        }
    }

    /**
     * Check if an index exists on a table (MySQL).
     */
    private function indexExists(string $table, string $indexName): bool
    {
        $db = DB::getDatabaseName();
        $res = DB::selectOne(
            "SELECT COUNT(1) AS c
               FROM information_schema.statistics
              WHERE table_schema = ? AND table_name = ? AND index_name = ?",
            [$db, $table, $indexName]
        );
        return (int)($res->c ?? 0) > 0;
    }
};
