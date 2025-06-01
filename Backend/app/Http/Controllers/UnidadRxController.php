<?php
namespace App\Http\Controllers;

use App\Models\UnidadRx;
use Illuminate\Http\Request;

class UnidadRxController extends Controller
{
    public function index()
    {
        return UnidadRx::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $unidadRx = UnidadRx::create($request->all());

        return response()->json($unidadRx, 201);
    }

    public function show(UnidadRx $unidadRx)
    {
        return $unidadRx;
    }

    public function update(Request $request, UnidadRx $unidadRx)
    {
        $request->validate([
            'name' => 'string|max:255',
        ]);

        $unidadRx->update($request->all());

        return response()->json($unidadRx, 200);
    }

    public function destroy(UnidadRx $unidadRx)
    {
        $unidadRx->delete();

        return response()->json(null, 204);
    }
}

