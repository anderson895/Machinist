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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thread_id')->constrained('offer_threads')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->dateTime('delivery_time')->nullable();
            $table->string('mop')->nullable();
            $table->string('mod')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
