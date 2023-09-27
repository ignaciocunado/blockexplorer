import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../style/TransactionInfo.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function TransactionInfo() {
    const [transaction, setTransaction] = useState({});

    useEffect(() => {
        async function getTransaction() {

        }

        getTransaction();
    })

    return (<h1>Info</h1>);
}

export default TransactionInfo;