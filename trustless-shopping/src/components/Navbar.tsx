import { useState } from "react";
import { connectWallet } from "../utils/web3";

const Navbar = () => {
    const [account, setAccount] = useState("");

    const handleConnect = async () => {
        const signer = await connectWallet();
        if (signer) {
            setAccount(await signer.getAddress());
        }
    };

    return (
        <nav className="p-4 bg-gray-900 text-white flex justify-between">
            <h1 className="text-xl font-bold">Trustless Shopping</h1>
            <button onClick={handleConnect} className="bg-blue-500 px-4 py-2 rounded">
                {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
            </button>
        </nav>
    );
};

export default Navbar;
