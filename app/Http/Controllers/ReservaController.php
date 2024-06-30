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
        $request->validate([
            'id_paciente' => 'required|exists:pacientes,id',
            'id_unidad' => 'required|exists:unidades,id',
            'fecha_reserva' => 'required|date',
        ]);

        $reserva = Reserva::create($request->all());

        return response()->json($reserva, 201);
    }

    public function show(Reserva $reserva)
    {
        return $reserva;
    }

    public function update(Request $request, Reserva $reserva)
    {
        $request->validate([
            'id_paciente' => 'exists:pacientes,id',
            'id_unidad' => 'exists:unidades,id',
            'fecha_reserva' => 'date',
        ]);

        $reserva->update($request->all());

        return response()->json($reserva, 200);
    }

    public function destroy(Reserva $reserva)
    {
        $reserva->delete();

        return response()->json(null, 204);
    }
}
