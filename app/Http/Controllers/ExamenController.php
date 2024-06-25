<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;

class ExamenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $examenes = Examen::all();
        return response()->json($examenes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_paciente' => 'required|integer',
            'id_med' => 'required|integer',
            'name' => 'required|string|max:255',
            'data' => 'required|string',
        ]);

        $examen = Examen::create($validatedData);

        return response()->json($examen, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Examen $examen)
    {
        return response()->json($examen);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Examen $examen)
    {
        $validatedData = $request->validate([
            'id_paciente' => 'required|integer',
            'id_med' => 'required|integer',
            'name' => 'required|string|max:255',
            'data' => 'required|string',
        ]);

        $examen->update($validatedData);

        return response()->json($examen);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Examen $examen)
    {
        $examen->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
