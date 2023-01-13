// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Token {
	string public name = "Falafel";
	string public symbol = "FLF";
	uint8 public decimals = 18;

	uint256 public totalSupply;

	mapping(address => uint) balances;

	event Transfer(address indexed from, address indexed to, uint value);

	constructor(){
		totalSupply = 1000 * (10 ** 18);
		balances[msg.sender] = totalSupply;
	}

	function balanceOf(address _address) external view returns(uint balance){
		balance = balances[_address];
	}

	function transfer(address recipient, uint amount) public returns(bool){
		require(balances[msg.sender] >= amount);
		balances[msg.sender] -= amount;
		balances[recipient] += amount;
		emit Transfer(msg.sender, recipient, amount);
		return true;
	}
}