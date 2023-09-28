import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../style/NavBar.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function NavBar() {
  const navi = useNavigate();

  const submit = (event) => {
    event.preventDefault()
    const form = event.target;
    const formData = new FormData(form);
    const searchValue = Object.fromEntries(formData.entries()).search.trim();

    const address = new RegExp('0x[0-9a-fA-F]{40}')
    const tx = new RegExp('0x[0-9a-fA-F]{64}')

    if(searchValue.match(tx)){
      return navi(`/tx/${searchValue}`);
    }
    if(searchValue.match(address)) {
      return navi(`/address/${searchValue}`);
    }
    if(searchValue === "" ) {
      return navi('/');
    }
    return navi('/404');
  } 

  const goHome = (event) => {
    event.preventDefault();
    navi('/', {replace:true});
  }
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
        <img src='https://www.chainalysis.com/wp-content/uploads/2022/02/bloggraphic-blockchains-01-1-2048x1117.png' id='headerLogo' alt='logo' onClick={goHome}></img>
        <h3 className='navBarText'>Ignacio's Block Explorer</h3>
        <p className='navBarText'>Gas Price: {currentGas} gwei</p>
        <form className='search' onSubmit={submit}>
          <input type='search' placeholder='Address | TX' name='search' id='search'/>
          <button type="submit" className="search-btn">🔍</button>
        </form>
      </div>
    </div>
  );
}

export default NavBar;
