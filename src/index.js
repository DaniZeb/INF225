import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginFunc from './pages/Public/Login/FuncionarioLog';
import reportWebVitals from './reportWebVitals';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import LoginPac from './pages/Public/Login/PacienteLog';
import RegisterFunc from './pages/Public/Register/FuncionarioReg';
import RegisterPac from './pages/Public/Register/PacienteReg';
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
import LandingPac from './pages/Private/landingPaciente.jsx';
import LandingFunc from './pages/Private/landingFuncionario.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login Paciente" element={<LoginPac />} />
        <Route path="/login Funcionario" element={<LoginFunc />} />
        <Route path="/Registro Funcionario" element={<RegisterFunc />} />
        <Route path="/Registro paciente" element={<RegisterPac />} />
        <Route path="/Identificacion" element={<Identificacion />} />
        <Route path="/datos" element={<DatosPaciente />} />
        <Route path="/datospersonales" element={<DatosPersonales />} />
        <Route path="/examenes" element={<Examenes />} />
        <Route path="/Horas-Agendadas" element={<Agendado />} />
        

        <Route path="/Menu" element={<Menu />} />

        <Route path="/cancelar-hora" element={<CancelarHora />} />
        <Route path="/calendario" element={<Calendario/>}/>
        <Route path="/Landing paciente" element={<LandingPac/>}/>
        <Route path="/Landing Funcionario" element={<LandingFunc/>}/>
      
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);