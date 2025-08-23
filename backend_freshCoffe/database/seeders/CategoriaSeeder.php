<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::create(["nombre" => "Café", "icono" => "cafe"]);
        Categoria::create(["nombre" => "Hamburguesas", "icono" => "hamburguesa"]);
        Categoria::create(["nombre" => "Pizzas", "icono" => "pizza"]);
        Categoria::create(["nombre" => "Donas", "icono" => "dona"]);
        Categoria::create(["nombre" => "Pasteles", "icono" => "pastel"]);
        Categoria::create(["nombre" => "Galletas", "icono" => "galletas"]);
    }
}
