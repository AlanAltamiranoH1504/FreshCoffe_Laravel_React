<?php

use App\Http\Controllers\PedidoController;
use Illuminate\Support\Facades\Route;

Route::prefix("usuarios")->group(function () {
    Route::post("/", [\App\Http\Controllers\UserController::class, "store"]);
    Route::post("/get_token", [\App\Http\Controllers\UserController::class, "get_token"]);

});
//Rutas protegidas por sanctum
Route::middleware(["auth:sanctum"])->group(function () {
    Route::post("/logout", [\App\Http\Controllers\UserController::class, "logout"]);
    Route::prefix("categorias")->group(function () {
        Route::get("/", [\App\Http\Controllers\CategoriaController::class, "index"]);
    });
    Route::prefix("productos")->group(function () {
        Route::get("/", [\App\Http\Controllers\ProductoController::class, "index"]);
    });
    Route::prefix("pedidos")->group(function () {
        Route::post("/", [\App\Http\Controllers\PedidoController::class, "store"]);
        Route::get("/", [PedidoController::class, "get_ordenes"]);
    });
});
