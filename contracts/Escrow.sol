// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TravelEscrow is Ownable {
    struct Deal {
        address payable buyer;
        address payable traveler;
        uint256 amount;
        bool itemDelivered;
        bool buyerConfirmed;
        uint256 expirationTime;
    }

    mapping(bytes32 => Deal) public deals;

    event DealCreated(bytes32 indexed dealId, address indexed buyer, address indexed traveler, uint256 amount);
    event ItemDelivered(bytes32 indexed dealId);
    event DealCompleted(bytes32 indexed dealId);
    event DealCancelled(bytes32 indexed dealId);
    event FundsReleased(bytes32 indexed dealId, address recipient, uint256 amount);

    // ✅ Initialize contract with the deployer as the owner
    constructor() Ownable(msg.sender) {}

    /// 🔹 Buyer creates a deal & locks funds
    function createDeal(address payable _traveler) external payable {
        require(msg.value > 0, "Must deposit funds");

        bytes32 dealId = keccak256(abi.encodePacked(msg.sender, _traveler, block.timestamp));

        deals[dealId] = Deal({
            buyer: payable(msg.sender),
            traveler: _traveler,
            amount: msg.value,
            itemDelivered: false,
            buyerConfirmed: false,
            expirationTime: block.timestamp + 3 days
        });

        emit DealCreated(dealId, msg.sender, _traveler, msg.value);
    }

    /// 🔹 Traveler marks item as delivered
    function markItemDelivered(bytes32 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.traveler, "Only the traveler can mark delivery");
        require(!deal.itemDelivered, "Already marked as delivered");

        deal.itemDelivered = true;
        emit ItemDelivered(_dealId);
    }

    /// 🔹 Buyer confirms delivery, releasing funds to traveler
    function confirmDelivery(bytes32 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.buyer, "Only the buyer can confirm delivery");
        require(deal.itemDelivered, "Item not marked as delivered yet");
        require(!deal.buyerConfirmed, "Already confirmed");

        deal.buyerConfirmed = true;
        payable(deal.traveler).transfer(deal.amount);
        emit DealCompleted(_dealId);
        emit FundsReleased(_dealId, deal.traveler, deal.amount);
    }

    /// 🔹 If buyer does nothing after 3 days, traveler can claim funds
    function releaseFundsAfterExpiration(bytes32 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.traveler, "Only traveler can claim expired funds");
        require(block.timestamp >= deal.expirationTime, "Deal is still active");
        require(!deal.buyerConfirmed, "Buyer already confirmed");

        payable(deal.traveler).transfer(deal.amount);
        emit FundsReleased(_dealId, deal.traveler, deal.amount);
    }

    /// 🔹 Buyer can cancel & get a refund before item is delivered
    function cancelDeal(bytes32 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.buyer, "Only buyer can cancel");
        require(!deal.itemDelivered, "Cannot cancel after delivery");

        payable(deal.buyer).transfer(deal.amount);
        emit DealCancelled(_dealId);
    }

    /// 🔹 Admin (owner) can resolve disputes & release funds manually
    function resolveDispute(bytes32 _dealId, bool releaseToTraveler) external onlyOwner {
        Deal storage deal = deals[_dealId];
        require(!deal.buyerConfirmed, "Deal already completed");

        if (releaseToTraveler) {
            payable(deal.traveler).transfer(deal.amount);
            emit FundsReleased(_dealId, deal.traveler, deal.amount);
        } else {
            payable(deal.buyer).transfer(deal.amount);
            emit FundsReleased(_dealId, deal.buyer, deal.amount);
        }
    }
}
