import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/navbar';

const EEReserva = () => {
  const [rut, setRut] = useState('');
  const [dv, setDv] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newFechaReserva, setNewFechaReserva] = useState('');
  const [newHoraReserva, setNewHoraReserva] = useState('');
  const [editError, setEditError] = useState(null);
  const [editOrDelete, setEditOrDelete] = useState('');

  useEffect(() => {
    setSelectedReserva(null);
    setEditMode(false);
    setNewFechaReserva('');
    setNewHoraReserva('');
    setEditError(null);
    setEditOrDelete('');
  }, [patientId]);

  const handleBuscar = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Verificar si el paciente existe
      const searchResponse = await fetch(`http://localhost:8000/api/patients/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut: parseInt(rut), rutDigit: parseInt(dv) }),
      });

      if (!searchResponse.ok) {
        throw new Error('Error al buscar el paciente.');
      }

      const searchResult = await searchResponse.json();

      if (!searchResult.success) {
        setError('Paciente no está registrado.');
        setPatientId(null);
        setReservas([]);
      } else {
        setPatientId(searchResult.patient.id);
        setError(null);
        setSuccess(null);

        // Obtener las reservas del paciente
        const reservasResponse = await fetch(`http://localhost:8000/api/reservas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!reservasResponse.ok) {
          throw new Error('Error al obtener las reservas del paciente.');
        }

        const reservasData = await reservasResponse.json();
        const reservasFiltradas = reservasData.filter(reserva => reserva.id_paciente === searchResult.patient.id);

        if (reservasFiltradas.length === 0) {
          setReservas([]);
          setError('El paciente no tiene reservas.');
        } else {
          setReservas(reservasFiltradas);
          setError(null);
        }
      }
    } catch (error) {
      setError(error.message || 'Error al buscar el paciente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarReserva = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Eliminar la reserva seleccionada
      if (!selectedReserva) {
        throw new Error('Por favor selecciona una reserva.');
      }

      const deleteResponse = await fetch(`http://localhost:8000/api/reservas/${selectedReserva.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fecha_reserva: selectedReserva.fecha_reserva, hora: selectedReserva.hora }),
      });

      if (!deleteResponse.ok) {
        throw new Error('Error al eliminar la reserva.');
      }

      setSuccess('Reserva eliminada correctamente.');
      setSelectedReserva(null);
      setReservas([]);

      // Actualizar el campo updated_at del paciente
      await actualizarUpdatedAtPaciente();
    } catch (error) {
      setError(error.message || 'Error al eliminar la reserva.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditarReserva = (reserva) => {
    setSelectedReserva(reserva);
    setEditMode(true);
    setNewFechaReserva(reserva.fecha_reserva);
    setNewHoraReserva(reserva.hora);
    setEditError(null);
    setEditOrDelete('');
  };

  const handleCheckboxChange = (reservaId) => {
    setSelectedReserva(reservas.find(reserva => reserva.id === reservaId));
  };

  const handleGuardarCambios = async () => {
    setLoading(true);
    setEditError(null);
  
    try {
      // Validar nueva fecha y hora
      if (!selectedReserva) {
        throw new Error('Por favor selecciona una reserva.');
      }
  
      // Formatear la fecha y la hora según sea necesario
      const formattedFechaReserva = newFechaReserva; // No es necesario formatear si el input type="date" ya está en formato ISO
  
      const updateData = {};
      
      if (newFechaReserva) {
        updateData.fecha_reserva = formattedFechaReserva;
      }
  
      if (newHoraReserva) {
        updateData.hora = newHoraReserva;
      }
  
      const updateResponse = await fetch(`http://localhost:8000/api/reservas/${selectedReserva.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Error al actualizar la reserva.');
      }
  
      setSuccess('Reserva actualizada correctamente.');
      setEditMode(false);
      setSelectedReserva(null);
      setNewFechaReserva('');
      setNewHoraReserva('');
      setReservas([]);
  
      // Actualizar el campo updated_at del paciente
      await actualizarUpdatedAtPaciente();
    } catch (error) {
      setEditError(error.message || 'Error al actualizar la reserva.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarEdicion = () => {
    setEditMode(false);
    setSelectedReserva(null);
    setNewFechaReserva('');
    setNewHoraReserva('');
    setEditError(null);
  };

  const actualizarUpdatedAtPaciente = async () => {
    try {
      const touchResponse = await fetch(`http://localhost:8000/api/patients/${patientId}/touch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!touchResponse.ok) {
        throw new Error('Error al actualizar el paciente.');
      }

      console.log('Campo updated_at del paciente actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el campo updated_at del paciente:', error.message);
    }
  };

  return (
    <div className="h-screen w-full">
      <nav className="fixed top-0 left-0 w-full shadow-xl z-50 bg-white">
        <Navbar />
      </nav>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
          Eliminar o Editar Reserva
        </h1>
        <div className="bg-orange-200 rounded-lg shadow-xl p-6 mt-4 w-full max-w-lg dark:bg-gray-50 dark:border-gray-50">
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
          <div className="flex items-center justify-between">
            <button
              onClick={handleBuscar}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
          {reservas.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Reservas del Paciente</h2>
              {editOrDelete === 'delete' && !editMode && (
                <div className="mb-4">
                  <button
                    onClick={handleEliminarReserva}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {loading ? 'Eliminando...' : 'Eliminar Reserva'}
                  </button>
                </div>
              )}
              {editMode ? (
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={selectedReserva.id}
                    checked={true}
                    onChange={() => {}}
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={selectedReserva.id} className="ml-2">{selectedReserva.fecha_reserva} {selectedReserva.hora}</label>
                  <div className="ml-4">
                    <p className="block text-gray-700 font-bold mb-2">Nueva Fecha:</p>
                    <input
                      type="date"
                      value={newFechaReserva}
                      onChange={(e) => setNewFechaReserva(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                    <p className="block text-gray-700 font-bold mb-2 mt-2">Nueva Hora:</p>
                    <input
                      type="time"
                      value={newHoraReserva}
                      onChange={(e) => setNewHoraReserva(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                    {editError && <p className="text-red-500 mt-2">{editError}</p>}
                    <div className="mt-2">
                      <button
                        onClick={handleGuardarCambios}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                      <button
                        onClick={handleCancelarEdicion}
                        className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                reservas.map(reserva => (
                  <div key={reserva.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={reserva.id}
                      checked={selectedReserva && selectedReserva.id === reserva.id}
                      onChange={() => handleCheckboxChange(reserva.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={reserva.id} className="ml-2">{reserva.fecha_reserva} {reserva.hora}</label>
                    <button
                      onClick={() => {
                        setEditOrDelete('delete');
                        setSelectedReserva(reserva);
                      }}
                      className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEditarReserva(reserva)}
                      className="ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Editar
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EEReserva;
