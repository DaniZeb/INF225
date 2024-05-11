import Navbar from '../../../Components/navbar';

import React, { useEffect, useState } from 'react';
import { UserRoundPlus, ArrowBigRightDash} from 'lucide-react';

function LoginFunc({ onLogin, onError }) {
  const [navbarBackground, setNavbarBackground] = useState(false);

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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
        onError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      onError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
    }
  };
  
  return (
    <div className=" h-screen w-full betwen " >
        <nav className={`fixed w-full h-24 shadow-xl ${navbarBackground ? 'bg-white' : 'bg-solid-color'} z-50`}>
      <Navbar/></nav>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         
        <div class="relative w-full max-w-lg m-10 ">

       
        <div class="w-full bg-orange-200 rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-xl dark:bg-gray-50 dark:border-gray-50">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-300">
                  Ingresa a tu cuenta de paciente
              </h1>
            
              <div>
  <label htmlFor="Rut" class="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">Rut</label>
  <input
    type="text"
    id="rut"
    value={email}
    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200"
    placeholder="Ingrese su Rut"
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-300">Contraseña</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-200" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-200" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                          
                      </div>
                      
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste la contraseña?</a>
                  </div>
                  <button onClick={handleLogin}>Iniciar Sesión</button>
                      
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrarse</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      ¿Aún no tienes una cuenta? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</a>
                  </p>
          
          </div>
      </div>
      </div>
       


        
        

        
      
        
 
   
        
     

     
      </div>


        
     
  
    <div className='w-10 text-white '></div>
    </div>
  );
}

export default LoginFunc;
