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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('category')->nullable();
            $table->bigInteger('subcategory')->nullable();
            $table->string('video_title')->unique()->nullable();
            $table->string('poster')->nullable();
            $table->string('video_slug')->nullable();
            $table->string('duration')->nullable();
            $table->string('released_year')->nullable();
            $table->string('star_casts')->nullable();
            $table->string('director')->nullable();
            $table->string('language')->nullable();
            $table->longText('captions')->nullable();
            $table->string('status')->nullable();
            $table->longText('upload_video')->nullable();
            $table->longText('upload_video_url')->nullable();
            $table->longText('description')->nullable();
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
        Schema::dropIfExists('videos');
    }
};
