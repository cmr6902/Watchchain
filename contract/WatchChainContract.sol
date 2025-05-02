// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract WatchMarketplaceEscrow is ReentrancyGuard { // info of watch
    struct Watch {
        uint id;
        address payable seller;
        string name;
        string description;
        uint price; // in wei
        bool isSold;
        address buyer;
        bool fundsReleased;
    }

    uint public nextId; // next avalable watch
    mapping(uint => Watch) public watches; // all watches avalavble 

    event WatchListed(uint id, address indexed seller, uint price);
    event WatchPurchased(uint id, address indexed buyer, uint price);
    event FundsReleased(uint id, address indexed to);

    // seller lists new watch
    function listWatch(string calldata name, string calldata description, uint price) external {
        require(price > 0, "Price must be greater than zero");

        watches[nextId] = Watch({ // how to post watch and info on it
            id: nextId,
            seller: payable(msg.sender),
            name: name,
            description: description,
            price: price,
            isSold: false,
            buyer: address(0),
            fundsReleased: false
        });

        emit WatchListed(nextId, msg.sender, price);
        nextId++;
    }

    // buyer buys the watch and ETH is held in escrow until delivery is confimed by buyere
    function buyWatch(uint id) external payable nonReentrant {
        require(id < nextId, "Invalid watch ID");
        Watch storage watch = watches[id];
        require(!watch.isSold, "Watch was already sold"); // things to not allow user to buy a watch
        require(msg.sender != watch.seller, "Seller cannot buy their own watch");
        require(msg.value == watch.price, "Incorrect payment amount");

        watch.isSold = true;
        watch.buyer = msg.sender;

        emit WatchPurchased(id, msg.sender, watch.price);
    }

    // buyer confirms delivery and funds are sent to seller 
    function confirmDelivery(uint id) external nonReentrant {
        require(id < nextId, "Invalid watch ID");
        Watch storage watch = watches[id];
        require(watch.isSold, "Watch not sold"); // things to not allow user say it was delivered
        require(!watch.fundsReleased, "Funds already released");
        require(msg.sender == watch.buyer, "Only buyer can confirm delivery");

        watch.fundsReleased = true;

        (bool success, ) = watch.seller.call{value: watch.price}("");
        require(success, "Transfer failed to send");

        emit FundsReleased(id, watch.seller);
    }

    // gives watch data
    function getWatch(uint id) public view returns (
        uint,
        address payable,
        string memory,
        string memory,
        uint,
        bool,
        address,
        bool
    ) {
        require(id < nextId, "Invalid watch ID");
        Watch memory watch = watches[id];
        return (
            watch.id,
            watch.seller,
            watch.name,
            watch.description,
            watch.price,
            watch.isSold,
            watch.buyer,
            watch.fundsReleased
        );
    }
}