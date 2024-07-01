<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'rut' => 'required|string|unique:users',
            'rutDigit' => 'required|string',
            'cargo' => 'required|string',
            'idUnidad' => 'required|exists:unidades,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rut' => $request->rut,
            'rutDigit' => $request->rutDigit,
            'cargo' => $request->cargo,
            'idUnidad' => $request->idUnidad,
        ]);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return $user;
    }
    public function update(Request $request, User $user)
    {
        try {
            // Validación de la solicitud
            $validatedData = $request->validate([
                'name' => 'string|max:255',
                'email' => 'string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'string|min:8|nullable',
                'rut' => 'string|unique:users,rut,' . $user->id,
                'rutDigit' => 'string',
                'cargo' => 'string',
                'idUnidad' => 'exists:unidad_rxes,id',
            ]);

            // Logging para depuración
            Log::info('Datos validados:', $validatedData);

            // Actualización del usuario
            $user->update([
                'name' => $validatedData['name'] ?? $user->name,
                'email' => $validatedData['email'] ?? $user->email,
                'password' => isset($validatedData['password']) ? Hash::make($validatedData['password']) : $user->password,
                'rut' => $validatedData['rut'] ?? $user->rut,
                'rutDigit' => $validatedData['rutDigit'] ?? $user->rutDigit,
                'cargo' => $validatedData['cargo'] ?? $user->cargo,
                'idUnidad' => $validatedData['idUnidad'] ?? $user->idUnidad,
            ]);

            // Respuesta exitosa
            Log::info('Usuario actualizado:', $user->toArray());
            return response()->json($user, 200);
        } catch (\Exception $e) {
            // Logging del error
            Log::error('Error al actualizar el usuario:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Error al actualizar el usuario. Detalles: ' . $e->getMessage()], 500);
        }
    }
    
    
    


    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
    public function touch(User $user)
    {
        try {
            $user->touch(); 
            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el paciente. Detalles: ' . $e->getMessage()], 500);
        }
    }
    public function search(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }
    }

}
