<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderCompletedRequest;
use App\Http\Requests\Pedido\CreatePedidoRequest;
use App\Models\pedido;
use App\Models\PedidoProducto;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    public function store(CreatePedidoRequest $request)
    {
        $validate = $request->validated();
        try {
            $user = User::where("id", auth()->id())
                ->first();
            $name_user = $user->name . " " . $user->apellidos;
            $id_pedido = DB::table("pedidos")->insertGetId([
                "total" => $request["total"],
                "user_id" => auth()->id(),
                "nombre" => $name_user,
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

    public function get_ordenes()
    {
        try {
            $ordenes = pedido::where("status", 0)
                ->with("pedidos_productos", "pedidos_productos.producto")
                ->orderBy("created_at", "desc")
                ->get();

            return response()->json($ordenes, 200);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => true,
                "message" => "Error en busqueda de ordenes",
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function set_order_completed(OrderCompletedRequest $request)
    {
        $validate = $request->validated();
        try {
            $order_to_update = pedido::where("id", $validate["id"])
                ->where("status", 0)
                ->first();
            if (!$order_to_update) {
                return response()->json([
                    "status" => false,
                    "message" => "Orden no encontrada"
                ], 404);
            }
            $order_to_update->status = 1;
            $order_to_update->save();
            return response()->json([
                "status" => true,
                "message" => "Orden actualizada correctamente"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "message" => "Error en completado de orden",
                "error" => $th->getMessage()
            ], 500);
        }
    }
}
