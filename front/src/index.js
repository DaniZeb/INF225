import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginFunc from './pages/Public/Login/FuncionarioLog';
//import reportWebVitals from './reportWebVitals';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import LoginPac from './pages/Public/Login/PacienteLog';
import RegisterFunc from './pages/Public/Register/FuncionarioReg';
import RegisterPac from './pages/Public/Register/PacienteReg';
import PacienteDatos from './pages/Public/Datas/Paciente_datos';
import Reservas from './pages/Private/Reserva';
import ReservaAdmin from './pages/Private/EE_reserva';
import EditaUser from './pages/Private/EditarUser';
import CrearUnidad from './pages/Private/CrearUnidad';
import SubMenu from './pages/Private/SubMenu'; // Corregido a PascalCase
import { createRoot } from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login-paciente" element={<LoginPac />} />
        <Route path="/login Funcionario" element={<LoginFunc />} />
        <Route path="/registro-funcionario" element={<RegisterFunc />} />
        <Route path="/Registro paciente" element={<RegisterPac />} />
        <Route path="/datos-paciente" element={<PacienteDatos />} />
        <Route path="/reservar" element={<Reservas />} />
        <Route path="/administrar-reserva" element={<ReservaAdmin />} />
        <Route path="/editar-user" element={<EditaUser />} />
        <Route path="/crear-unidad" element={<CrearUnidad />} />
        <Route path="/menu-funcionario" element={<SubMenu />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
