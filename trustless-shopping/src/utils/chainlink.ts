import fetch from "node-fetch";

/** Fetches delivery tracking status from Chainlink Oracle */
export const getTrackingStatus = async (trackingNumber: string) => {
    try {
        const response = await fetch(
            `https://api.chainlinktracking.com/status?trackingNumber=${trackingNumber}`
        );

        if (!response.ok) {
            throw new Error(`Chainlink API Error: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response from Chainlink Oracle.");
        }

        const data = await response.json();
        return data.status || "Unknown status";
    } catch (error) {
        throw new Error(`Chainlink Oracle Error: ${(error as Error).message}`);
    }
};

