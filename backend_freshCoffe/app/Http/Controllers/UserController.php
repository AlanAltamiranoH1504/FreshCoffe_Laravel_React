<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\GetTokenRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class UserController extends Controller
{
    public function store(CreateUserRequest $request)
    {
        $validate = $request->validated();
        try {
            $user_to_save = User::create($validate);
            return response()->json([
                "status" => true,
                "message" => "Usuario creado correctamente",
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function get_token(GetTokenRequest $request)
    {
        $validate = $request->validated();
        try {
            $user = User::where("email", $validate["email"])->first();
            $password_verify = Hash::check($validate["password"], $user->password);
            if (!$password_verify) {
                return response()->json([
                    "status" => false,
                    "error" => "Credenciales incorrectas"
                ], 403);
            }
            $token = $user->createToken("auth_token")->plainTextToken;
            return response()->json([
                "status" => true,
                "token" => $token,
                "expiration" => Carbon::now()->addMinutes(60)->toDateTimeString()
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                "status" => true,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "status" => false,
                "error" => $th->getMessage()
            ], 500);
        }
    }
}
