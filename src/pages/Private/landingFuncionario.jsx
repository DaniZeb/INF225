
import Navbar from '../../Components/navbar';

import React, { useEffect, useState } from 'react';

import Identificacion from '../../Identificacion'

function LandingFunc() {
  const [navbarBackground, setNavbarBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className=" flex h-screen w-full " >
        <nav className={`fixed w-full h-24 shadow-xl ${navbarBackground ? 'bg-white' : 'bg-solid-color'} z-50`}>
      <Navbar/></nav>


      <div className='flex w-full items-center rounded-full mt-30 justify-center bg-slate-100'><Identificacion></Identificacion></div>

      


    </div>

  );
}

export default LandingFunc;
