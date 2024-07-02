import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import logop from './logop.png'; // Importa la imagen
import Buscador from './buscador';
import { CircleUser } from 'lucide-react';
import LoginFunc from "../pages/Public/Login/FuncionarioLog";
import { Route } from "react-router-dom";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="relative flex md:flex-row items-center justify-between h-24 max-w-screen-xl mx-auto px-4 text-black">
      <div className="flex items-center text-lg md:text-lg lg:text-lg font-extralight mb-2 md:mb-0">
        <img src={"https://w7.pngwing.com/pngs/1021/329/png-transparent-radiology-medicine-patient-digital-radiography-surgery-health-text-logo-medicine-thumbnail.png"} alt="Logo de la aplicación" className="rounded-full m-3 h-20" />
        Centro de imageonología
      </div>

      <ul className={` hidden md:flex  font-light  right-0 overflow-hidden mx-10`}>
        <Link to="/"><button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>Home</button></Link>
        
        <Link to="/"><button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>Sobre nosotros</button></Link>
        <Link to="/"><button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>Contacto</button></Link>
        <Link to="Login Paciente"><button className="p-3 md:p-4 hover:text-cyan-500 duration-500 flex space-x-2 " onClick={closeMenu}>
          <CircleUser className="mr-2"/>
          Iniciar sesión paciente
        </button></Link>

        <Link to="Login Funcionario"><button className=" flex p-3 md:p-4 hover:text-cyan-500 duration-500 space-x-2" onClick={closeMenu}>
          <CircleUser className="mr-2" />
          Iniciar sesión funcionario
        </button></Link>

        
      </ul>


      <div className="md:hidden cursor-pointer relative z-10" onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
      </div>

      <ul className={` flex-col md:flex-row flex font-light absolute top-full right-0 bg-white rounded-md overflow-hidden z-20 transition-all duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>Home</button>
        <button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>Sobre nosotros</button>
        <button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>Contacto</button>

        <button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>
  <CircleUser />
  Iniciar sesión paciente
</button>

<button className="p-3 md:p-4 hover:text-cyan-500 duration-500" onClick={closeMenu}>
  <CircleUser />
  Iniciar sesión funcionario
</button>
      </ul>
    </nav>
  );
};

export default Navbar;
