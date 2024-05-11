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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login Paciente" element={<LoginPac />} />
        <Route path="login Funcionario" element={<LoginFunc />} />
        <Route path="Registro Funcionario" element={<RegisterFunc />} />
        <Route path="Registro paciente" element={<RegisterPac />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);