import { NextApiRequest, NextApiResponse } from "next";
import { getEscrowContract } from "../../utils/web3";
import { ethers } from "ethers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contract = getEscrowContract();

    if (req.method === "POST") {
        const { action, amount } = req.body;

        try {
            if (action === "deposit") {
                console.log(`Mock deposit ${amount} ETH`);
                await contract.deposit({ value: ethers.utils.parseEther(amount) });
                return res.status(200).json({ success: true, txHash: "0xmockeddeposittransactionhash" });
            }

            if (action === "release") {
                console.log("Mock release funds");
                await contract.releaseFunds();
                return res.status(200).json({ success: true, txHash: "0xmockedreleasetransactionhash" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: (error as Error).message });
        }
    } else if (req.method === "GET") {
        try {
            console.log("Mock fetch escrow balance");
            const balance = await contract.getEscrowBalance();
            return res.status(200).json({ success: true, balance: ethers.utils.formatEther(balance) });
        } catch (error) {
            return res.status(500).json({ success: false, error: (error as Error).message });
        }
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
