import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
// https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState(0);
  const [block, setBlock] = useState({});

  useEffect(() => {
    async function getBlockNumber() {
      await alchemy.core.getBlockNumber().then(res => {
        setBlockNumber(res);
      })
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getBlockWithTransactions() {
      await alchemy.core.getBlockWithTransactions().then(res => {
        setBlock(res);
      })
    }

    getBlockWithTransactions();
  }, [blockNumber]);

  console.log(blockNumber)
  console.log(block)

  return (<div>
    <div id='header'>
      <img src='./logoTitle.png' id='headerLogo' alt='logo'></img>
      <h3 id='title'>Ignacio's Block Explorer</h3>
    </div>
    <div id='currentBlock'>
      <center><h2>Latest Block: {blockNumber}</h2></center>
      {
        block &&
        <div id='blockInfo'>
          <h3>Timestamp: {block.timestamp}</h3>
          <h3>Hash: {block.hash}</h3>
        </div>
      }
      <ol>
        {block.transactions?.map((tx, i) => {<li key={"tx_" + i}>{tx.hash}</li>})}
      </ol>
    </div>
  </div> );
}
export default App;
