<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            "name" => "required|string|max:255",
            "apellidos" => "required|string|max:255",
            "email" => "required|string|email|max:255|unique:users,email",
            "password" => "required|string|min:6"
        ];
    }

    public function messages(): array
    {
        return [
            "name.required" => "El nombre es obligatorio",
            "name.string" => "El nombre debe ser una cadena de caracteres",
            "name.max" => "El nombre no puede superar los 255 caracteres",

            "apellidos.required" => "Los apellidos son obligatorios",
            "apellidos.string" => "Los apellidos deben ser una cadena de caracteres",
            "apellidos.max" => "Los apellidos no puede superar los 255 caracteres",

            "email.required" => "El email es obligatorio",
            "email.string" => "El email debe ser una cadena de caracteres",
            "email.max" => "El email no puede superar los 255 caracteres",
            "email.unique" => "El email ya esta en uso",

            "password.required" => "La contraseña es obligatoria",
            "password.string" => "La contraseña debe ser una cadena de caracteres",
            "password.min" => "La contraseña debe tener al menos 6 caracteres",
        ];
    }
}
