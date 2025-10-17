<?php

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
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
        Route::get("/get_all_products", [ProductoController::class, "get_all_products"]);
        Route::put("/update_product_status", [ProductoController::class, "update_product_status"]);
    });
    Route::prefix("pedidos")->group(function () {
        Route::post("/", [\App\Http\Controllers\PedidoController::class, "store"]);
        Route::get("/", [PedidoController::class, "get_ordenes"]);
        Route::post("/set_order_completed", [PedidoController::class, "set_order_completed"]);
    });

    Route::get("/user_in_sesion", [UserController::class, "user_in_sesion"]);
});
