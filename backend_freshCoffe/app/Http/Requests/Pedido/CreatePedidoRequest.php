<?php

namespace App\Http\Requests\Pedido;

use Illuminate\Foundation\Http\FormRequest;

class CreatePedidoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "total" => "required|numeric|min:1",
        ];
    }

    public function messages(): array
    {
        return [
            "total.required" => "El total del pedido es obligatorio",
            "total.numeric" => "El total debe ser una cifra numerica",
            "total.min" => "El total debe ser mayor a cero",
        ];
    }
}
