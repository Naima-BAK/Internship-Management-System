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
        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('navbarbackground');
        $table->string('navbarcolor');
        $table->string('navbaricon');
        $table->string('navbarbutton');
        $table->string('sidebarbg');
        $table->string('sidebarbackground');
        $table->string('sidebarecolor');
        $table->string('sidebaricon');
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
        Schema::dropIfExists('colors');
    }
};
