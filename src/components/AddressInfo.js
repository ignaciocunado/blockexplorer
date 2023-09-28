import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../style/AddressInfo.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function AddressInfo(props) {
    const [balance, setBalance] = useState({});
    const address = props.address

    useEffect(() => {
        async function getBalance() {
            await alchemy.core.getTokenBalances(address).then((res) => setBalance(res));
        }
        getBalance();
    },[address])

    console.log(balance.tokenBalances);

    const balancesMapped = balance.tokenBalances?.map((bal, i) => (<li key={'bal_' + i}>Address: {bal.contractAddress}, Balance: {parseInt(bal.tokenBalance)}</li>));
    return (
        <div id='info'>
        <center><h3>Address: {address}</h3></center>
        <ul>
          {balancesMapped}
        </ul>
      </div>
    );
}


export default AddressInfo;