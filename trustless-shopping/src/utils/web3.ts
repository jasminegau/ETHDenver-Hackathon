import { ethers } from "ethers";

//frontend MetaMask wallet connection
export const connectWallet = async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        return signer;
    } else {
        alert("Please install MetaMask!");
        return null;
    }
};

//backend contract interaction

export const getEscrowContract = () => {
    return {
        deposit: async (_options?: any) => {
            console.log("Mock deposit function called");
            return { wait: async () => console.log("Transaction confirmed") };
        },
        releaseFunds: async () => {
            console.log("Mock releaseFunds function called");
            return { wait: async () => console.log("Transaction confirmed") };
        },
        getEscrowBalance: async () => {
            console.log("Mock getEscrowBalance function called");
            return "500000000000000000"; // Mock balance of 0.5 ETH (in wei)
        }
    };
};


