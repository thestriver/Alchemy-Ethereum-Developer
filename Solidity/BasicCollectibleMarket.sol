// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Market {
    // create the Collectible struct
    struct Collectible {
        address owner;
        bool forSale;
        uint price;
    }

    // map a uint ID to a Collectible struct
    mapping(uint => Collectible) idToCollectible;

    function purchase(uint _id) external payable {
        // find the collectible by the id passed in
        Collectible storage collectible = idToCollectible[_id];
        // purchase the collectible
        require(msg.value >= collectible.price);
        collectible.owner = msg.sender;
        collectible.forSale = false;
    }
}