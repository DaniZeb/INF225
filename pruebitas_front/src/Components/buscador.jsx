import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

const Buscador = () => {
  const [busqueda, setBusqueda] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [buscq, setbus] = useState(false);

  const handlebus = () => {
    setbus(!buscq);
  };

  const onChange = async (e) => {
    setBusqueda(e.target.value);
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch('https://auto-cl-default-rtdb.firebaseio.com/V1/vehicles/new/search/data.json');
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta de la API');
        }
        const data = await response.json();
        setVehiculos(data);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    if (buscq) {
      obtenerDatos();
    }
  }, [buscq]);

  const vehiculosFiltrados = vehiculos.filter((vehiculo) => vehiculo.image && vehiculo.model && vehiculo.brand);

  return (
    <form className='w-[270px] relative'>
      <div className="flex items-center my-10 ">
        <div onClick={handlebus} role="menu" className='block items center cursor-pointer mx-7'>
          {buscq ? <AiOutlineClose size={20} /> : <AiOutlineSearch size={20} />}
        </div>

        {buscq && (
          <input
            type="search"
            placeholder='Ingresa el nombre a buscar ...'
            className='w-full p-1 rounded-full bg-white border border-gray-500 text-black text-sm'
            value={busqueda}
            onChange={onChange}
          />
        )}
      </div>

      {buscq && vehiculosFiltrados.length > 0 && (
        <div className="rounded-sm absolute top-[calc(100%+5px)] left-20 z-10 bg-white border border-gray-300 w-50 max-h-40 overflow-y-auto">
          {vehiculosFiltrados.filter(item => item.brand.toLowerCase().startsWith(busqueda.toLowerCase()) || item.model.toLowerCase().startsWith(busqueda.toLowerCase()) ).map((item, index) => (
            <div key={index} className="p-2 hover:bg-gray-100">
              {item.brand} - {item.model}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Buscador;
