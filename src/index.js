import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginFunc from './pages/Public/Login/FuncionarioLog';
import reportWebVitals from './reportWebVitals';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import LoginPac from './pages/Public/Login/PacienteLog'; // Importación de LoginPac
import RegisterFunc from './pages/Public/Register/FuncionarioReg';
import RegisterPac from './pages/Public/Register/PacienteReg'; // Asegúrate que esta es la ruta correcta
import CancelarHora from './cancelar_hora.js';
import Calendario from './calendario.js';
import Menu from './menu.js';
import Identificacion from './Identificacion.js';
import DatosPersonales from './datosper.js';
import DatosPaciente from './datospaciente.js';
import Examenes from './examenes.js';
import Agendado from './Horas_agendadas.js';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import LandingPac from './pages/Private/landingPaciente.jsx'; // Importación de LandingPac
import LandingFunc from './pages/Private/landingFuncionario.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Define las funciones de manejo de login/error aquí o impórtalas desde un archivo de utilidades
const handleLoginSuccess = (userData) => {
  console.log("Login exitoso:", userData);
  // Aquí puedes agregar lógica para redirigir al usuario,
  // guardar el estado del usuario (ej. en un contexto global, Redux, o localStorage)
  // Por ejemplo, para redirigir a la landing del paciente:
  // window.location.href = '/Landing paciente'; // O usa useNavigate de react-router-dom
};

const handleLoginError = (errorMessage) => {
  console.error("Error al iniciar sesión (desde index.js):", errorMessage);
  alert(errorMessage); // Muestra una alerta simple para depurar
  // Aquí puedes actualizar el estado para mostrar un mensaje de error en la UI
};

// =================================================================
// Define también las funciones para el registro de paciente aquí
// =================================================================
const handleRegisterSuccess = (userData) => {
  console.log("Registro de paciente exitoso:", userData);
  // Lógica para redirigir al usuario o mostrar un mensaje de éxito
  alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  // Considera redirigir a la página de login aquí
  // Por ejemplo: window.location.href = '/login Paciente';
};

const handleRegisterError = (errorMessage) => {
  console.error("Error al registrar paciente (desde index.js):", errorMessage);
  alert(errorMessage); // Muestra una alerta simple para depurar
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Ruta para Login de Paciente (ya corregida) */}
        <Route
          path="/login Paciente"
          element={
            <LoginPac
              onLogin={handleLoginSuccess}
              onError={handleLoginError}
            />
          }
        />
        <Route path="/login Funcionario" element={<LoginFunc />} />
        <Route path="/Registro Funcionario" element={<RegisterFunc />} />

        {/* ================================================================= */}
        {/* ¡Corrige esta línea para Registro de Paciente!                   */}
        {/* ================================================================= */}
        <Route
          path="/Registro paciente"
          element={
            <RegisterPac
              onRegister={handleRegisterSuccess} // Pasa la función de éxito para el registro
              onError={handleRegisterError}     // Pasa la función de error para el registro
            />
          }
        />

        <Route path="/Identificacion" element={<Identificacion />} />
        <Route path="/datos" element={<DatosPaciente />} />
        <Route path="/datospersonales" element={<DatosPersonales />} />
        <Route path="/examenes" element={<Examenes />} />
        <Route path="/Horas-Agendadas" element={<Agendado />} />

        <Route path="/Menu" element={<Menu />} />

        <Route path="/cancelar-hora" element={<CancelarHora />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/Landing paciente" element={<LandingPac />} />
        <Route path="/Landing Funcionario" element={<LandingFunc />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();