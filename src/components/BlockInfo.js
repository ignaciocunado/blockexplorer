import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../style/BlockInfo.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function BlockInfo() {

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
    const transactionlist = block.transactions?.map((tx, i) => (<li key={"tx_" + i}>{tx.hash}</li>))
    console.log(transactionlist)

    return (
    <div id='currentBlock'>
      <center><h2>Latest Block: {blockNumber}</h2></center>
      {
        block &&
        <div id='blockData'>
          <div id='blockNumbers'>
            <h3>Timestamp: {block.timestamp}</h3>
            <h3>Hash: {block.hash}</h3>
            <h3>Gas Used: {block.gasUsed?.toString()}</h3>
          </div>
          <div id='transactionList'>
            <center><h3>Transacion Hashes:</h3></center>
            <ol>
              {transactionlist}
            </ol>
          </div>
        </div>
      }
    </div>);
}

export default BlockInfo;