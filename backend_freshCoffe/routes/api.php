<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("categorias")->group(function () {
    Route::get("/", [\App\Http\Controllers\CategoriaController::class, "index"]);
});
