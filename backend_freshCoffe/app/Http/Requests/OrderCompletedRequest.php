<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderCompletedRequest extends FormRequest
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
            "id" => "required|integer|exists:pedidos,id"
        ];
    }

    public function messages()
    {
        return [
            "id.required" => "El id de la orden es obligatorio",
            "id.integer" => "Id de la orden no valido",
            "id.exists" => "Id de orden no existente"
        ];
    }
}
