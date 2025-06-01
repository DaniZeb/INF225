import React, { useState } from 'react';
import Navbar from '../../Components/navbar';

const Reserva = () => {
  const [fecha, setFecha] = useState('');
  const [hora_reserva, setHora] = useState(''); 
  const [rut, setRut] = useState('');
  const [dv, setDv] = useState('');
  const [nombre, setNombre] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const patientData = { rut: parseInt(rut), rutDigit: parseInt(dv), name: nombre, diagnostico };

    try {
      const checkResponse = await fetch(`http://localhost:8000/api/patients/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut: patientData.rut, rutDigit: patientData.rutDigit }),
      });

      if (!checkResponse.ok) {
        throw new Error('Error al verificar la existencia del paciente.');
      }

      const checkResult = await checkResponse.json();
      let patient;

      if (!checkResult.success) {
        console.log('Paciente no existe, creando uno nuevo.');
        const patientResponse = await fetch('http://localhost:8000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patientData),
        });

        if (!patientResponse.ok) {
          const patientError = await patientResponse.json();
          throw new Error(patientError.message || 'Error al crear el paciente.');
        }

        patient = await patientResponse.json();
      } else {
        console.log('Paciente ya existe:', checkResult.patient);
        patient = checkResult.patient;

        console.log('Actualizando campo updated_at del paciente existente:', patient.id);
        const touchResponse = await fetch(`http://localhost:8000/api/patients/${patient.id}/touch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!touchResponse.ok) {
          const touchError = await touchResponse.json();
          throw new Error(touchError.message || 'Error al actualizar el paciente.');
        }
      }

      const reservaData = {
        id_paciente: patient.id,
        id_unidad: 1, 
        fecha_reserva: fecha,
        hora: hora_reserva, 
      };

      console.log('Creando reserva con id_paciente:', reservaData.id_paciente);

      const reservaResponse = await fetch('http://localhost:8000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (!reservaResponse.ok) {
        const reservaError = await reservaResponse.json();
        throw new Error(reservaError.message || 'Error al crear la reserva.');
      }

      const reserva = await reservaResponse.json();

      setSuccess('Reserva creada exitosamente.');
      setFecha('');
      setHora('');
      setRut('');
      setDv('');
      setNombre('');
      setDiagnostico('');
      setLoading(false);

    } catch (error) {
      setError(error.message || 'Error al crear la reserva. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full">
      <nav className="fixed top-0 left-0 w-full shadow-xl z-50 bg-white">
        <Navbar />
      </nav>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
          Reserva de Cita
        </h1>
        <div className="bg-orange-200 rounded-lg shadow-xl p-6 mt-4 w-full max-w-lg dark:bg-gray-50 dark:border-gray-50">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">Fecha de la Reserva:</p>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">Hora de la Reserva:</p>
              <input
                type="time"
                value={hora_reserva}
                onChange={(e) => setHora(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">RUT:</p>
              <input
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">Dígito Verificador:</p>
              <input
                type="text"
                value={dv}
                onChange={(e) => setDv(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">Nombre del Paciente:</p>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">Diagnóstico:</p>
              <input
                type="text"
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Reservando...' : 'Reservar'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
