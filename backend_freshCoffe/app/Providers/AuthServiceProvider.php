<?php


namespace App\Providers;

use App\Models\pedido;
use App\Policies\PedidosPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        pedido::class => PedidosPolicy::class
    ];


    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
