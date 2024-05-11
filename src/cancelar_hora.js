import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/cancelar_hora.css';
import { Link } from 'react-router-dom';


function CancelarHora() {
  const [rut, setRut] = useState("");
  const [examen, setExamen] = useState("");

  const navigate = useNavigate(); 

  const cancelarHora = () => {
    fetch(`http://localhost:5000/api/users/${rut}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      navigate('/'); // Navega a menu.js
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const cambiarHora = () => {
    // Guarda los datos del paciente en el almacenamiento local del navegador
    localStorage.setItem('paciente', JSON.stringify({ rut, examen }));
    navigate('/calendario');
  };

  return (
    <form>
      <div className="cuadritop" id="cuadradito">
      <div>
        <h1 className="h1">MODIFICAR HORA</h1>

        <div className="casilla1-2"> 
          <div className="opcion">
            <label>
              RUT<br></br>
              <input type="text" className="casilla11" value={rut} onChange={e => setRut(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="casilla1-2">
          <div className="opciones">
            <label>
              Tipo de examen<br></br>
              <select className="casilla11" value={examen} onChange={e => setExamen(e.target.value)}>
                <option value="Nada"></option>
                <option value="Imageonología">Imageonología</option>
                <option value="Kinesiología">Kinesiología</option>
                <option value="Parto">Parto</option>
              </select>
            </label>
          </div>
        </div>

        <br></br><br></br>
        <div class= "boton2" id = "boton2">
            <input type="button" className="button1" value="cancelar hora" onClick={cancelarHora} />
        </div>
        <br></br><br></br>
        <div class= "boton2" id = "boton2">
            <input type="button" className="button1" value="cambiar hora" onClick={cambiarHora} />
        </div>
      
      </div>
      </div>
    </form>
  );
}

export default CancelarHora;
