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
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState();
  const [gasUsed, setGasUsed] = useState();
  const [txs, setTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    async function getAndSetBlockInfo() {
      setBlockInfo(await alchemy.core.getBlock(blockNumber));
    }
    async function getGas() {
      setGasUsed(parseInt(blockInfo.gasUsed._hex));
      console.log(gasUsed)
    }
    async function getTxs() {
      setTransactions(blockInfo.transactions.map((tx) => {
        "<li>" + tx + "</li>"
      }));
    }
    getBlockNumber().then(getAndSetBlockInfo()).then(getGas()).then(getTxs);
  });

  return <div className="App">
    <div id="tableDiv">
      <table id="table">
        <tr colspan="2">
          <td>Block: {blockNumber}</td>
        </tr>
        <tr>
          <td>Gas Used:</td>
          <td>{gasUsed}</td>
        </tr>
        <tr>
          <td>Transactions: </td>
          <td>
            <ol>
            {txs}
            </ol>
          </td>
        </tr>
      </table>
    </div>
    </div>;
}

export default App;
