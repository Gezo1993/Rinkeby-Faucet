//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "./owned.sol";

contract mortal is owned {
    // The destroy functin will destruct
    // the contract by deleting all the of
    // the contract's code and sending the
    // all the eth that it holds to the
    // the address that owned it
    function destroy() public onlyOwner {
        selfdestruct(payable(owner));
    }
}
