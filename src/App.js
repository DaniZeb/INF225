import logo from './logo.svg';
import Buscador from './Components/buscador'
import Navbar from './Components/navbar'

import Catalogos from './Components/catalogo'
import React, { useEffect, useState } from 'react';
import { UserRoundPlus, ArrowBigRightDash,} from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
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
  return (
    <div className=" h-screen w-full " >
        <nav className={`fixed w-full h-24 shadow-xl ${navbarBackground ? 'bg-white' : 'bg-solid-color'} z-50`}>
      <Navbar/></nav>

      <div class=" flex ml-auto justify-between min-h-screen items-center">
        <div className="col-span-2 mt-3 w-[100%] flex items-center">
          <div className='flex-col md:flex-row'>
          <div className='relative w-full max-w-lg m-10 '>
        <div class="absolute top-0 -left-4 w-full h-full bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 "></div>
          
          <div className='flex flex-col md:flex-row justify-center'>
            <h1 className="whitespace-normal mt-4 text-2xl md:text-4xl lg:text-2xl xl:text-3xl">
              Conoce nuestra nueva plataforma
            </h1>

          </div>
          <div className="flex flex-col md:flex-row justify-center ">
            <h1 className="whitespace-normal mt-4 text-lg md:text-lg lg:text-3xl xl:text-lg">
              Recuerda registrate o logearte en tu cuenta de paciente
            </h1>
          </div>

          
         

        </div>
        <div className='flex items-end'>

             <Link to="Registro Paciente"><button className="p-3 md:p-4 hover:text-cyan-500 duration-500 flex space-x-2 ">
              <ArrowBigRightDash />
              <UserRoundPlus className="mr-2"/>
              Registro de sesión paciente 
            </button></Link>
            <Link to="Registro Funcionario"><button className="p-3 md:p-4 hover:text-cyan-500 duration-500 flex space-x-2 ">
              <ArrowBigRightDash />
              <UserRoundPlus className="mr-2"/>
              Registro de sesión Funcionario 
            </button></Link>
           

          </div>

          </div>
       


        
        

        <div class="  relative w-full max-w-lg m-10">
          <div class="absolute top-0 -left-4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div class="absolute top-0 -right-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div class="absolute -bottom-8 left-20 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div class="m-8 relative space-y-4"></div>
          <div className=" -left-4 h-70  bg-white mix-blend-multiply filter">
            
                  <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/001/193/837/small_2x/ambulance.png"
                
                  className="animate-slide  "
                  />
            
        </div>
        </div>
        </div>
      
        
 
   
        
     

     
      </div>

        
     
  
    <div className='w-10 text-white '></div>
    </div>
  );
}

export default App;
