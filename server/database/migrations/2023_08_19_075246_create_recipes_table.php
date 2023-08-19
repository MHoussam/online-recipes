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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->integer('publisher_id');
            $table->string('name');
            $table->string('cuisine');
            $table->string('ingredients');
            $table->string('image_id')->nullable();
            $table->timestamps();
        });

        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->integer('recipe_id');
            $table->string('image_url');
            $table->timestamps();
        });

        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->integer('recipe_id');
            $table->integer('liker_id');
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->integer('recipe_id');
            $table->integer('commenter_id');
            $table->string('comment');
            $table->timestamps();
        });

        Schema::create('shoppinglists', function (Blueprint $table) {
            $table->id();
            $table->integer('recipe_id');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
