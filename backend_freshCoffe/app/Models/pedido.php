<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class pedido extends Model
{
    protected $table = "pedidos";
    protected $primaryKey = "id";
    protected $hidden = ['updated_at'];
    protected $fillable = [
        "user_id",
        "total",
        "status"
    ];

    public function user()
    {
        $this->belongsTo(User::class, "id", "id");
    }

    public function pedidos_productos()
    {
        return $this->hasMany(PedidoProducto::class, "pedido_id", "id");
    }
}
