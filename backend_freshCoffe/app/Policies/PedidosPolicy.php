<?php

namespace App\Policies;

use App\Models\User;
use App\Models\pedido;
use Illuminate\Auth\Access\Response;

class PedidosPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->admin === 1;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, pedido $pedido): bool
    {
        return $user->admin === 1;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, pedido $pedido): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, pedido $pedido): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, pedido $pedido): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, pedido $pedido): bool
    {
        return false;
    }
}
