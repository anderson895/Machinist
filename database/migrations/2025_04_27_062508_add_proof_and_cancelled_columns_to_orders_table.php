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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('proof_of_payment')
                  ->nullable()
                  ->comment('Stores the filename of payment proof image');
                  
            $table->timestamp('cancelled_by_user_date')
                  ->nullable()
                  ->comment('Timestamp when user cancelled the order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('proof_of_payment');
            $table->dropColumn('cancelled_by_user_date');
        });
    }
};
