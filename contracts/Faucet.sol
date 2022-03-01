//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "./mortal.sol";

contract faucet is mortal {
    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    struct transactionStruct {
        address sender;
        uint256 amount;
    }

    transactionStruct[] depositTransactions;

    // receive any amount of ether
    // sent to this contract
    receive() external payable {
        depositTransactions.push(transactionStruct(msg.sender, msg.value));
        //Shows the address that deposited some ether
        // and the value
        emit Deposit(msg.sender, msg.value);
    }

    // We need a way to grab our depositTransactions
    // getAllDepositTransactions does that for us
    function getAllDepositTransactions()
        public
        view
        returns (transactionStruct[] memory)
    {
        return depositTransactions;
    }

    // We need a withdrawTransactions array with struct
    // to enable us store all the withdraw transactions
    // that have happened as an array on the blockchain
    transactionStruct[] withdrawTransactions;

    //The withdraw function gives out ether
    // to anyone who asks
    function withdraw(uint256 _amount) public {
        // Allow a moximum of 1 ether per withdraw request
        require(
            _amount <= 1 ether,
            "You are only allowed to withdraw a maximum of 1 ether at a time."
        );

        // Make sure that the contract has enough ether
        // to give away
        require(
            address(this).balance > _amount,
            "Insufficient ether in the faucet."
        );

        // Now lets push our transaction in the
        //withdrawTransactions array with withdrawStruct
        withdrawTransactions.push(transactionStruct(msg.sender, _amount));

        // If the the above conditions are met,
        // give out the requested amount of ether
        // to the initiator of the transaction
        payable(msg.sender).transfer(_amount);

        // Shows the address that withdraw
        // some ether and the value
        emit Withdrawal(msg.sender, _amount);
    }

    //We yet again need a way to access our withdrawTransactions
    // array outside the contract and getallWithdrawTransactions
    // does that for us
    function getAllWithdrawTransactions()
        public
        view
        returns (transactionStruct[] memory)
    {
        return withdrawTransactions;
    }

    //Accessing the balance of our contract outside
    // can also be cool thing!!!
    // balanceOfContract function will do us justice!!!
    function balanceOfContract() external view returns (uint256) {
        return address(this).balance;
    }
}
