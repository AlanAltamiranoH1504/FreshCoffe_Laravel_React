<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusProductRequest extends FormRequest
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
            "id" => "required|integer|exists:productos,id"
        ];
    }

    public function messages()
    {
        return [
            "id.required" => "El id del producto es obligatorio",
            "id.integer" => "Id de producto no valido",
            "id.exists" => "Producto no encontrado"
        ];
    }
}
