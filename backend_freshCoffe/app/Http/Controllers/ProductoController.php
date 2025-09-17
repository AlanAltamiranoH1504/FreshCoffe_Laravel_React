<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\UpdateStatusProductRequest;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        try {
            $productos = Producto::where("disponible", true)
                ->orderBy("id", "DESC")
                ->get();
            return response()->json($productos);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ]);
        }
    }

    public function get_all_products()
    {
        try {
            $products = Producto::all();
            return response()->json($products, 200);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "message" => "Error en listado de productos",
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function update_product_status(UpdateStatusProductRequest $request)
    {
        $validate = $request->validated();
        try {
            $product_to_update = Producto::where("id", $validate["id"])
                ->first();
            $product_to_update->disponible = !$product_to_update->disponible;
            $product_to_update->save();

            return response()->json([
                "status" => true,
                "message" => "Estado de producto actualizado"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "message" => "Error en actualizacion de disponibilidad",
                "error" => $th->getMessage()
            ], 500);
        }
    }
}
