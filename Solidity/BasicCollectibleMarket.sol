// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
	address owner;
	uint price;

	event Deployed(address indexed);
	constructor() {
		owner = msg.sender;
		emit Deployed(msg.sender);
	}

	event Transfer(address indexed, address indexed);
	function transfer(address recipient) external {
		require(msg.sender == owner);
		owner = recipient;
		emit Transfer(msg.sender, recipient);
	}

	event ForSale(uint, uint);
	function markPrice(uint _price) external {
		require(msg.sender == owner);
		price = _price;
		emit ForSale(price, block.timestamp);
	}

	event Purchase(uint, address indexed);
	function purchase() payable external {
		require(msg.value == price && price > 0);
		price = 0;
		(bool success, ) = owner.call{ value: msg.value }("");
		require(success);
		owner = msg.sender;
		emit Purchase(msg.value, msg.sender);
	} 
}