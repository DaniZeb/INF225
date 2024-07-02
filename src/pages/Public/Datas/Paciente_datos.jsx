import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../Components/navbar';

const Paciente_datos = () => {
  const location = useLocation();
  const paciente = location.state?.paciente;
  const [examenes, setExamenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (paciente) {
      fetch(`http://localhost:8000/api/examenes/patient/${paciente.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setExamenes(data.examenes);
          } else {
            setError(data.message || 'Error al obtener los exámenes.');
          }
          setLoading(false);
        })
        .catch((error) => {
          setError('Error al obtener los exámenes. Inténtalo de nuevo más tarde.');
          setLoading(false);
        });
    }
  }, [paciente]);

  if (!paciente) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No se han encontrado datos del paciente.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <nav className="fixed top-0 left-0 w-full shadow-xl z-50 bg-white">
        <Navbar />
      </nav>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
          Datos del Paciente
        </h1>
        <div className="bg-orange-200 rounded-lg shadow-xl p-6 mt-4 w-full max-w-lg dark:bg-gray-50 dark:border-gray-50">
          <p>
            <span className="font-bold">Nombre:</span> {paciente.name}
          </p>
          <p>
            <span className="font-bold">Diagnóstico:</span>{' '}
            {paciente.diagnostico ? paciente.diagnostico : 'No disponible'}
          </p>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-blue-300 mt-8">
          Exámenes del Paciente
        </h2>
        <div className="bg-orange-200 rounded-lg shadow-xl p-6 mt-4 w-full max-w-lg dark:bg-gray-50 dark:border-gray-50">
          {loading ? (
            <p>Cargando exámenes...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : examenes.length > 0 ? (
            <ul>
              {examenes.map((examen) => (
                <li key={examen.id} className="mb-4">
                  <p>
                    <span className="font-bold">Nombre:</span> {examen.name}
                  </p>
                  <p>
                    <span className="font-bold">Datos:</span> {examen.data}
                  </p>
                  <p>
                    <span className="font-bold">Recurso:</span> {examen.recurso || 'No disponible'}
                  </p>
                  <p>
                    <span className="font-bold">Fecha de creación:</span> {new Date(examen.created_at).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-bold">Fecha de actualización:</span> {new Date(examen.updated_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay exámenes disponibles para este paciente.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paciente_datos;
