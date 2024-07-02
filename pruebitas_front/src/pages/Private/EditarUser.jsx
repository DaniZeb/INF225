import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/navbar';

const EditarUser = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [unidadOptions, setUnidadOptions] = useState([]);
  const [selectedUnidad, setSelectedUnidad] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUnidades();
  }, []);

  const fetchUnidades = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/unidad-rxes');
      if (!response.ok) {
        throw new Error('Error al cargar unidades');
      }
      const data = await response.json();
      setUnidadOptions(data);
    } catch (error) {
      console.error('Error fetching unidades:', error.message);
      setError('Error al cargar unidades.');
    }
  };

  const handleBuscar = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/users/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al buscar usuario');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarCambios = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const body = {
        name: user.name,
        email: user.email,
        idUnidad: selectedUnidad,
      };
      console.log('Sending data:', body);

      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(errorData.message || 'Error al guardar cambios');
      }

      const data = await response.json();
      console.log('Response data:', data);
      setSuccessMessage('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Catch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnidadChange = (e) => {
    setSelectedUnidad(e.target.value);
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
                Editar Usuario
              </h1>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                    placeholder="Ingrese el email del usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={handleBuscar} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Buscar Usuario
              </button>
              {loading && <p>Cargando...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {user && (
                <>
                  <h2 className="text-lg font-bold mb-2">Usuario Encontrado</h2>
                  <p>Nombre: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <div className="mt-4">
                    <label htmlFor="unidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                      Seleccionar Unidad
                    </label>
                    <select
                      id="unidad"
                      value={selectedUnidad}
                      onChange={handleUnidadChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                    >
                      <option value="">Seleccionar...</option>
                      {unidadOptions.map((unidad) => (
                        <option key={unidad.id} value={unidad.id}>
                          {unidad.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={handleGuardarCambios} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
                    Guardar Cambios
                  </button>
                  {successMessage && <p className="text-green-500">{successMessage}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUser;
