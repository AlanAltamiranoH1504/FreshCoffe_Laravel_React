<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pedido\CreatePedidoRequest;
use App\Models\pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
//    public function store(CreatePedidoRequest $request)
    public function store(Request $request)

{
//        $validate = $request->validated();
        try {
            $id_pedido = DB::table("pedidos")->insertGetId([
                "total" => $request["total"],
                "user_id" => auth()->id()
            ]);

            //Obtener los productos
            $productos = $request->productos;


            // Formatear arreglo

            //Almacenar

            return response()->json([
                "status" => true,
                "message" => "Pedido creado correctamente",
                "productps" => $request->productos
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "message" => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, pedido $pedido)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(pedido $pedido)
    {
        //
    }
}
