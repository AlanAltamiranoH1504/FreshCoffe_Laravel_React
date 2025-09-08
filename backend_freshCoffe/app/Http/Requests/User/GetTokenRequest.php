<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class GetTokenRequest extends FormRequest
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
            "email" => "required|string|email|max:255|exists:users,email",
            "password" => "required|string",
        ];
    }

    public function messages(): array
    {
        return [
            "email.required" => "El email es obligatorio",
            "email.string" => "El email debe ser una cadena de caracteres",
            "email.email" => "El email debe tener un formato de email",
            "email.exists" => "El email no existe",

            "password.required" => "La contraseña es obligatoria",
            "password.string" => "La contraseña debe ser una cadena de caracteres",
        ];
    }
}
