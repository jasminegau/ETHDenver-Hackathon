const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Starting deployment...");

    const TravelEscrow = await ethers.getContractFactory("TravelEscrow");

    console.log("⌛ Deploying TravelEscrow contract to Mumbai...");
    
    const escrow = await TravelEscrow.deploy();
    await escrow.waitForDeployment(); // ✅ Fix deployment

    console.log(`✅ TravelEscrow deployed successfully to: ${await escrow.getAddress()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
