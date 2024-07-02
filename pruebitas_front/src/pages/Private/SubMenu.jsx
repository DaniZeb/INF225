import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigRightDash, UserRoundPlus } from 'lucide-react';
import Navbar from '../../Components/navbar';

const Sub_menu = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <nav className="fixed top-0 left-0 w-full shadow-xl z-50 bg-white">
        <Navbar />
      </nav>
      <div className="mt-24 flex flex-wrap justify-center gap-4">
        <Link to="/login-paciente">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex space-x-2">
            <ArrowBigRightDash />
            <UserRoundPlus className="mr-2" />
            Login Paciente
          </button>
        </Link>
        <Link to="/reservar">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex space-x-2">
            <ArrowBigRightDash />
            <UserRoundPlus className="mr-2" />
            Reservar
          </button>
        </Link>
        <Link to="/administrar-reserva">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex space-x-2">
            <ArrowBigRightDash />
            <UserRoundPlus className="mr-2" />
            Administrar Reserva
          </button>
        </Link>
        <Link to="/editar-user">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex space-x-2">
            <ArrowBigRightDash />
            <UserRoundPlus className="mr-2" />
            Editar Usuario
          </button>
        </Link>
        <Link to="/crear-unidad">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex space-x-2">
            <ArrowBigRightDash />
            <UserRoundPlus className="mr-2" />
            Crear Unidad
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sub_menu;
