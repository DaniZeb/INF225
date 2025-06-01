import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/navbar';

const PacienteLog = () => {
  const [rut, setRut] = useState('');
  const [dv, setDv] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [messageColor, setMessageColor] = useState('text-red-500');
  const navigate = useNavigate(); // Utilizamos useNavigate en lugar de useHistory

  const handleSearchPatient = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/patients/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, rutDigit: dv }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.patient && data.patient.diagnostico) {
          // Redirigir a Paciente_datos y pasar los datos del paciente como estado de ubicación
          navigate('/datos-paciente', { state: { paciente: data.patient } });
        } else {
          setSearchMessage('Paciente encontrado, pero no hay información disponible.');
          setMessageColor('text-green-500');
        }
      } else {
        setSearchMessage(
          data.message || 'Paciente no encontrado. Verifica el RUT y el dígito verificador.'
        );
        setMessageColor('text-red-500');
      }
    } catch (error) {
      setSearchMessage('Error al buscar el paciente. Inténtalo de nuevo más tarde.');
      setMessageColor('text-red-500');
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100">
      <nav className="fixed top-0 left-0 w-full h-24 shadow-xl bg-white z-50">
        <Navbar />
      </nav>
      <div className="flex items-center justify-center h-full">
        <div className="relative w-full max-w-lg m-10">
          <div className="w-full bg-orange-200 rounded-lg shadow-xl dark:bg-gray-50 dark:border-gray-50">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
                Ingreso Paciente
              </h1>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label htmlFor="rut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                    Rut
                  </label>
                  <input
                    type="text"
                    id="rut"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                    placeholder="Ingrese su Rut sin dígito verificador"
                    onChange={(e) => setRut(e.target.value)}
                  />
                </div>
                <div className="w-20">
                  <label htmlFor="dv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                    DV
                  </label>
                  <input
                    type="text"
                    id="dv"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                    placeholder="DV"
                    onChange={(e) => setDv(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={handleSearchPatient} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Verificar Paciente
              </button>
              {searchMessage && <p className={messageColor}>{searchMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacienteLog;
