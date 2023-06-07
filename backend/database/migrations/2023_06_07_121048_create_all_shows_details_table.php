<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('all_shows_details', function (Blueprint $table) {
            $table->id();
            $table->string('shows_type')->nullable();
            $table->string('shows_name')->unique()->nullable();
            $table->string('shows_slug')->nullable();
            $table->string('shows_image')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('all_shows_details');
    }
};
