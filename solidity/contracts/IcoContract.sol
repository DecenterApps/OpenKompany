pragma solidity ^0.4.23;
pragma experimental "v0.5.0";

import "./lib/Token.sol";
import "./lib/IColony.sol";

/// @title IcoContract
contract IcoContract {

	uint public PRICE = 10 ** 15; // 0.001 ether
	Token public token;
	IColony public colony;
	uint public dateCreated;

	event TokensBought(address indexed user, uint numOfTokens);

	constructor(address _token, address _colony) public {
		token = Token(_token);
		colony = IColony(_colony);
		dateCreated = now;
	}

	function buyToken(uint numOfTokens) public payable {
		require(msg.value >= numOfTokens*PRICE);
		require(isActive());
		
		token.mint(numOfTokens);
		token.transfer(msg.sender, numOfTokens);

		address(colony).transfer(msg.value);
		colony.claimColonyFunds(address(0));

		emit TokensBought(msg.sender, numOfTokens);
	}

	function isActive() public view returns(bool active) {
		active = (dateCreated > now - 10 days) ? true : false;
	}
	
}