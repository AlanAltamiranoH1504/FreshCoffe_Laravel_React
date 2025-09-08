<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("usuarios")->group(function () {
    Route::post("/", [\App\Http\Controllers\UserController::class, "store"]);
    Route::post("/get_token", [\App\Http\Controllers\UserController::class, "get_token"]);
});

Route::prefix("categorias")->group(function () {
    Route::get("/", [\App\Http\Controllers\CategoriaController::class, "index"]);
});

Route::prefix("productos")->group(function () {
    Route::get("/", [\App\Http\Controllers\ProductoController::class, "index"]);
});
