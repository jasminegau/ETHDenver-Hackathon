import { useState } from "react";

const EscrowCard = () => {
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("Not Funded");

    const handleDeposit = async () => {
        alert(`Depositing ${amount} ETH into escrow`);
        setStatus("Funds Locked");
    };

    const handleRelease = async () => {
        alert("Releasing funds to traveler");
        setStatus("Funds Released");
    };

    return (
        <div className="p-4 bg-gray-900 text-white rounded">
            <h2 className="text-xl font-bold mb-2">Escrow Contract</h2>
            <p>Status: {status}</p>

            <input
                type="number"
                placeholder="Amount (ETH)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 w-full mb-2 text-black"
            />

            <button onClick={handleDeposit} className="bg-blue-500 px-4 py-2 rounded mr-2">
                Deposit
            </button>

            <button onClick={handleRelease} className="bg-green-500 px-4 py-2 rounded">
                Release Funds
            </button>
        </div>
    );
};

export default EscrowCard;
