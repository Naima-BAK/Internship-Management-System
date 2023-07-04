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
        Schema::create('rapports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('file'); 
            $table->string('version'); 

            $table->unsignedBigInteger('user_id');
            $table->string('user_name');
            $table->string('encadrant_name');

            $table->unsignedBigInteger('encadrant_id');
            $table->string('sent_by');         
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('encadrant_id')->references('id')->on('users');
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
        Schema::dropIfExists('rapports');
    }
};
