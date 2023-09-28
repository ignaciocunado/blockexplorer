import NavBar from "../components/NavBar";
import TransactionInfo from "../components/TransactionInfo";
import { useNavigate, useParams} from "react-router-dom";

function Transaction() {
    const navi = useNavigate();
    const params = useParams();

    try{
        const reg = new RegExp('0x[0-9a-fA-F]{64}')
        if(!params.txHash.match(reg)) throw new Error("Invalid Transaction")
    }
    catch(err) {
        navi('/404', {replace:true});
    }

    return (
        <div>
            <NavBar />
            <br />
            <br />
            <br />
            <br />
            <TransactionInfo txHash={params.txHash}/>
        </div>
    );
}

export default Transaction;