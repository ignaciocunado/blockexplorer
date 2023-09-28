import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../style/TransactionInfo.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function TransactionInfo(props) {
    const [transaction, setTransaction] = useState({});
    const hash = props.txHash;

    useEffect(() => {
        async function getTransaction() {
          await alchemy.core.getTransactionReceipt(hash).then(res => setTransaction(res));
        }

        getTransaction();
    },[hash]);

    return (
      <div id='info'>
        <center><h3>Hash: {transaction.transactionHash}</h3></center>
        <ul>
          <li>From: {transaction?.from}</li>
          <li>To: {transaction?.to}</li>
          <li>Gas Used: {transaction?.gasUsed?.toString()}</li>
        </ul>
      </div>
    );
}

export default TransactionInfo;