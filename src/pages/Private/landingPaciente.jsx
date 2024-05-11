
import Navbar from '../../Components/navbar';


import React, { useEffect, useState } from 'react';

import Menu from '../../menu'

function LandingPac() {
  const [navbarBackground, setNavbarBackground] = useState(false);

  return (
    <div className=" h-screen w-full " >
        <nav className={`fixed w-full h-24 shadow-xl ${navbarBackground ? 'bg-white' : 'bg-solid-color'} z-50`}>
      <Navbar/></nav>
      <Menu></Menu>

 
    </div>

  );
}

export default LandingPac;