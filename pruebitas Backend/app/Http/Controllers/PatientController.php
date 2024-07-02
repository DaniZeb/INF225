<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rut' => 'required|integer|unique:patients,rut',
            'rutDigit' => 'required|integer',
            'name' => 'required|string|max:255',
            'diagnostico' => 'required|string|max:255',
        ]);

        $patient = Patient::create($validatedData);

        return response()->json($patient, 201);
    }

    public function show(Patient $patient)
    {
        return $patient;
    }

    public function update(Request $request, Patient $patient)
    {
        $validatedData = $request->validate([
            'rut' => 'required|integer|unique:patients,rut,'.$patient->id,
            'rutDigit' => 'required|integer',
            'name' => 'required|string|max:255',
            'diagnostico' => 'required|string|max:255',
        ]);

        $patient->update($validatedData);

        return response()->json($patient, 200);
    }

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
            return response()->json(['success' => true, 'patient' => $patient]);
        } else {
            return response()->json(['success' => false, 'message' => 'Paciente no encontrado.']);
        }
    }

    public function touch(Patient $patient)
    {
        try {
            $patient->touch(); 
            return response()->json($patient, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el paciente. Detalles: ' . $e->getMessage()], 500);
        }
    }
    
}
