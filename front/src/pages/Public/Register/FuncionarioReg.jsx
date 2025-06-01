import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/navbar';

function LoginFunc({ onLogin, onError }) {
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');
  const [rutDigit, setRutDigit] = useState('');
  const [name, setName] = useState('');
  const [cargo, setCargo] = useState('');
  const [unidadOptions, setUnidadOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fetch unidad options from backend
    const fetchUnidadOptions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/unidad-rxes');
        if (!response.ok) {
          throw new Error('Error al obtener las unidades.');
        }
        const data = await response.json();
        setUnidadOptions(data.map(unidad => ({ id: unidad.id, name: unidad.name })));
      } catch (error) {
        console.error('Error fetching unidad options:', error);
      }
    };

    fetchUnidadOptions();
  }, []);

  const handleRegister = async () => {
    try {
      setLoading(true);

      // Encrypt password (you should use a secure encryption method)
      const encryptedPassword = password; // Replace with actual encryption logic

      // Prepare user data for registration
      const userData = {
        rut: parseInt(rut),
        rutDigit: parseInt(rutDigit),
        name,
        email,
        password: encryptedPassword,
        cargo,
        idUnidad: parseInt(cargo), // Assuming cargo is the id of the unidad
      };

      // Send registration request to backend
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin({
          email,
          nombre: data.user.nombre,
          apellido: data.user.apellido,
          tipo: data.user.tipo,
          rut: data.user.rut,
        });
      } else {
        console.error(data.message);
        onError('Error al registrar el usuario.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error during user registration:', error);
      onError('Error al registrar el usuario. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full">
      <nav className={`fixed w-full h-24 shadow-xl ${navbarBackground ? 'bg-white' : 'bg-solid-color'} z-50`}>
        <Navbar />
      </nav>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="relative w-full max-w-lg m-10">
          <div className="w-full bg-orange-200 rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-xl dark:bg-gray-50 dark:border-gray-50">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
                Registro de Usuario
              </h1>

              <div>
                <label htmlFor="rut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                  Rut
                </label>
                <input
                  type="text"
                  id="rut"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                  placeholder="Ingrese su Rut"
                />
              </div>

              <div>
                <label htmlFor="rutDigit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                  Dígito Verificador
                </label>
                <input
                  type="text"
                  id="rutDigit"
                  value={rutDigit}
                  onChange={(e) => setRutDigit(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                  placeholder="Ingrese el Dígito Verificador"
                />
              </div>

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                  placeholder="Ingrese su Nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                  placeholder="Ingrese su Email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="cargo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">
                  Cargo
                </label>
                <select
                  id="cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
                >
                  <option value="">Seleccione un Cargo</option>
                  {unidadOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFunc;
