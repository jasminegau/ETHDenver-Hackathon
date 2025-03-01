import { NextApiRequest, NextApiResponse } from "next";

/** Fetches Verifiable Credentials (VCs) from Humanity Protocol */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const userAddress = req.query.address;
        if (!userAddress) {
            return res.status(400).json({ error: "Missing user address" });
        }

        // Call Humanity Protocol API
        const response = await fetch(`https://api.humanityprotocol.org/vcs/${userAddress}`);
        const data = await response.json();

        return res.status(200).json({ success: true, verified: data.verified });
    } catch (error) {
        return res.status(500).json({ success: false, error: (error as Error).message });
    }
}
