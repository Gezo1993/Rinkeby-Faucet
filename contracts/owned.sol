//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract owned {
    // Address of the account that deployed
    // the contract making it the owner of the contract
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // This modifier will allow only the owner
    // of the contract to destruct it
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the owner of the contract can destruct it."
        );
        _;
    }
}
