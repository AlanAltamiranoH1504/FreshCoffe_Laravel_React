<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = "productos";
    protected $primaryKey = "id";
    protected $hidden = ["created_at", "updated_at"];
    protected $fillable = [
        "nombre",
        "precio",
        "imagen",
        "disponible",
        "categoria_id"
    ];

    // Un producto pertenece a una categoria
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, "categoria_id", "id");
    }
}
