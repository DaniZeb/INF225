<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function index()
    {
        return Reserva::all();
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'id_paciente' => 'required|exists:patients,id',
                'id_unidad' => 'required|exists:unidad_rxes,id',
                'fecha_reserva' => 'required|date',
                'hora' => ['required', 'regex:/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/']
                //'hora' => 'required', // Asegúrate del formato correcto para hora (HH:MM)
            ]);
    
            $reserva = Reserva::create($request->all());
    
            return response()->json($reserva, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear la reserva: ' . $e->getMessage()], 500);
        }
    }
    

    public function show(Reserva $reserva)
    {
        return $reserva;
    }

    public function update(Request $request, Reserva $reserva)
    {
        $validatedData = $request->validate([
            'fecha_reserva' => 'required|date',
            'hora' => 'required|date_format:H:i'
        ]);

        // Actualizar reserva
        $reserva->update($validatedData);

        return response()->json($reserva, 200);
    }

    public function destroy(Reserva $reserva)
    {
        // Eliminar la reserva
        $reserva->delete();

        return response()->json(null, 204);
    }

    public function updateFecha(Request $request, Reserva $reserva)
    {
        $request->validate([
            'fecha_reserva' => 'required|date',
        ]);
    
        $reserva->fecha_reserva = $request->fecha_reserva;
        $reserva->save();
    
        return response()->json($reserva, 200);
    }
    

}
