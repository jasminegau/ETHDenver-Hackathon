import { NextApiRequest, NextApiResponse } from "next";
import { getTrackingStatus } from "../../utils/chainlink";

/** Fetches package tracking data from Chainlink Oracle */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { trackingNumber } = req.query;
        if (!trackingNumber) {
            return res.status(400).json({ success: false, error: "Missing tracking number" });
        }

        const trackingStatus = await getTrackingStatus(trackingNumber as string);
        return res.status(200).json({ success: true, trackingStatus });
    } catch (error) {
        return res.status(500).json({ success: false, error: (error as Error).message });
    }
}

