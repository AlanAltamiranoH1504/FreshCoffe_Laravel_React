<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pedido\CreatePedidoRequest;
use App\Models\pedido;
use App\Models\PedidoProducto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    public function store(CreatePedidoRequest $request)
    {
        $validate = $request->validated();
        try {
            $id_pedido = DB::table("pedidos")->insertGetId([
                "total" => $request["total"],
                "user_id" => auth()->id(),
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now()
            ]);

            //Obtener los productos
            $productos = $request->productos;
            // Formatear arreglo
            $pedido_producto = [];
            foreach ($productos as $producto) {
                $pedido_producto[] = [
                    "pedido_id" => $id_pedido,
                    "producto_id" => $producto["id"],
                    "cantidad" => $producto["cantidad"],
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now()
                ];
            }
            //Almacenar
            PedidoProducto::insert($pedido_producto);
            return response()->json([
                "status" => true,
                "message" => "Pedido creado correctamente",
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "message" => $th->getMessage()
            ], 500);
        }
    }
}
