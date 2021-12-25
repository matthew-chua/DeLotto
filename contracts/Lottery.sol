// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery{

    //a dynamic array of addresses named players
    //payable -> can be paid
    address payable[] public players;

    //admin address
    address payable public admin;

    //constructor

    constructor(){
        //make the deployer of the contract the admin
        //msg.sender is a global variable, address of the contract deployer
        //there is a typecast to payable as well, since admin is payable
        admin = payable(msg.sender);

    }


    //every contract needs this
    //handles all incoming funds
    receive() external payable{

        //ensures that players pay 1 eth
        require(msg.value == 1 ether);

        //ensures the contract deployer is not playing
        require(msg.sender != admin);

        players.push(payable(msg.sender));
    }

    //this returns the balance this smart contract holds
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinnner() public {

        //requires the contract deployer to be the one picking the winner
        //pass in a callback if the function caller is not the admin
        require(admin == msg.sender, "Not contract deployer");

        //requires at least 3 players
        require(players.length>=3, "Insufficient players");

        //init winner
        address payable winner;

        //choose the winner
        winner = players[random() % players.length];

        //transfer funds
        
        winner.transfer(getBalance());

        //give admin a 10% cut
        // admin.transfer(getBalance());

        //reset the lottery by removing players
        players = new address payable[](0);

    }

}