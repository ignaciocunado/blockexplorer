import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Address from './pages/Address';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tx/:txHash" element={<Transactions />} />
        <Route path="address/:address" element={<Address />} />;
    </Routes>
      );
}

export default App;