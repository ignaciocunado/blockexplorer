import NavBar from "../components/NavBar";
import AddressInfo from "../components/AddressInfo";
import { useNavigate, useParams } from "react-router-dom";


function Address() {
    const navi = useNavigate();
    const params = useParams();

    try{
        const reg = new RegExp('0x[0-9a-fA-F]{40}');
        if(!params.address.match(reg)) throw new Error("Invalid Address");
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
            <AddressInfo address={params.address} />
        </div>
    )
}

export default Address;