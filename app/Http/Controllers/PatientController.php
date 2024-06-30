<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rut' => 'required|integer',
            'rutDigit' => 'required|integer',
            'name' => 'required|string|max:255',
            'diagnostico' => 'required|string',
        ]);

        $patient = Patient::create($validatedData);

        return response()->json($patient, 201);
    }

    // Display the specified resource.
    public function show(Patient $patient)
    {
        return response()->json($patient);
    }

    // Update the specified resource in storage.
    public function update(Request $request, Patient $patient)
    {
        $validatedData = $request->validate([
            'rut' => 'required|integer',
            'rutDigit' => 'required|integer',
            'name' => 'required|string|max:255',
            'diagnostico' => 'required|string|max:255',
        ]);

        $patient->update($validatedData);

        return response()->json($patient);
    }

    // Remove the specified resource from storage.
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return response()->json(null, 204);
    }
    public function search(Request $request)
    {
        $validatedData = $request->validate([
            'rut' => 'required|integer',
            'rutDigit' => 'required|integer',
        ]);

        $patient = Patient::where('rut', $validatedData['rut'])
                          ->where('rutDigit', $validatedData['rutDigit'])
                          ->first();

        if ($patient) {
            // Incluir el id, nombre y diagnóstico en la respuesta
            return response()->json([
                'success' => true, 
                'patient' => [
                    'id' => $patient->id,
                    'name' => $patient->name,
                    'diagnostico' => $patient->diagnostico,
                ]
            ]);
        } else {
            return response()->json(['success' => false, 'message' => 'Paciente no encontrado.']);
        }
    }

    
}

