import React from 'react';
import { Link } from 'react-router-dom';
import './css/menu.css';
import App from './App';
import CancelarHora from './cancelar_hora';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate(); 
  const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/App.js');
     
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="cuadri">
        <div className='contenido'>
          <h1>Bienvenido al Sistema de Gestión de Imagenología</h1>
          <p>Por favor, inicia sesión para comenzar a gestionar tus horas</p>
          <div className="botones">
            <Link to="/login">
              <button className="button1" >Iniciar Sesión</button>
            </Link>
            <Link to="/SignUp">
              <button className="button1" >Registrarse</button>
            </Link>
            {/* <Link to="/App">
              <button className="button1" >Registrar hora</button>
            </Link>
            <Link to="/cancelar-hora">
              <button className="button1" >Cancelar hora</button>
            </Link>
            <Link to="/Identificacion">
              <button className="button1" >Obtener datos del paciente</button>
            </Link> */}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Menu;
