import React from 'react';

import './App.css';



// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
// https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function Header() {
  return (
    <div>
      <div id='header'>
        <img src='./logoTitle.png' id='headerLogo' alt='logo'></img>
        <h3 id='title'>Ignacio's Block Explorer</h3>
      </div>
    </div>
  );
}

export default Header;
