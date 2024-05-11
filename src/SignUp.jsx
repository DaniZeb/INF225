// En el archivo Login.js
import './css/Login.css';
import React, { useState } from 'react';

function Login({ onLogin, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    if (password !== confirmPassword){
        console.log('Error al iniciar sesión. Las contraseñas no coinciden.')
        return
    }
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
    <div className="container">
      <h2>Registrarse</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Contraseña:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Confirmar Contraseña:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Registrarse</button>
    </div>
  );
}

export default Login;