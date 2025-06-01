import React, { useState } from 'react';

const CrearUnidad = () => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    const unidadData = { name: nombre };
  
    try {
      const response = await fetch('http://localhost:8000/api/unidad-rxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unidadData),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la unidad.');
      }
  
      //const data = await response.json();
      setSuccess('Unidad creada exitosamente.');
      setNombre('');
      setLoading(false);
    } catch (error) {
      setError('Error al crear la unidad. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
          Crear Unidad
        </h1>
        <div className="bg-orange-200 rounded-lg shadow-xl p-6 mt-4 w-full max-w-lg dark:bg-gray-50 dark:border-gray-50">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="block text-gray-700 font-bold mb-2">Nombre del Área:</p>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Creando...' : 'Crear Unidad'}
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

export default CrearUnidad;
