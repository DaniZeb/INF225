<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'string|min:8|nullable',
            'rut' => 'string|unique:users,rut,' . $user->id,
            'rutDigit' => 'string',
            'cargo' => 'string',
            'idUnidad' => 'exists:unidades,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'rut' => $request->rut,
            'rutDigit' => $request->rutDigit,
            'cargo' => $request->cargo,
            'idUnidad' => $request->idUnidad,
        ]);

        return response()->json($user, 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
