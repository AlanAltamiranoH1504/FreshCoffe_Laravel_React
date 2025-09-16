<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PedidoProducto extends Model
{
    protected $table = "Pedido_Productos";
    protected $primaryKey = "id";
    protected $hidden = ["created_at", "updated_at"];
    protected $fillable = [
        "pedido_id",
        "producto_id",
        "cantidad"
    ];

    public function pedido()
    {
        return $this->belongsTo(pedido::class, "pedido_id", "id");
    }
    public function producto()
    {
        return $this->belongsTo(Producto::class, "producto_id", "id");
    }
}
