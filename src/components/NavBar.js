import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../style/NavBar.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function NavBar() {

  const [currentGas, setGas] = useState(0);

  useEffect(() => {
    async function getGas() {
      await alchemy.core.getGasPrice().then(res => setGas(parseInt(res) /1000000000));
    }
    getGas();
  })

  return (
    <div>
      <div id='header'>
        <img src='./logoTitle.png' id='headerLogo' alt='logo'></img>
        <h3 class='navBarText'>Ignacio's Block Explorer</h3>
        <p class='navBarText'>Gas Price: {currentGas} gwei</p>
        <form class='search'><input type='search' placeholder='Address | TX'></input><button type="submit" class="search-btn">🔍</button></form>
      </div>
    </div>
  );
}

export default NavBar;
