import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Load from "./Loader.js";
import { ethers } from "ethers";
import faucet from "../artifacts/contracts/Faucet.sol/faucet.json";
import { ShortenAddress } from "../utils/shortenAddress";
import { ReverseTransactions } from "../utils/ReverseTransactions";

const ContractAddress = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  async function withdrawEther() {
    try {
      if (!withdrawAmount) return;
      if (typeof window.ethereum !== "undefined") {
        requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          ContractAddress,
          faucet.abi,
          signer
        );
        const parsedWithdrawAmount = ethers.utils.parseEther(withdrawAmount);

        const transactionHash = await contract.withdraw(
          parsedWithdrawAmount._hex
        );
        console.log(`Withdrawing ${withdrawAmount} from ${ContractAddress}`);
        console.log(`Loading - ${transactionHash.hash}`);
        setIsLoading(true);
        await transactionHash.wait();
        setIsLoading(false);
        setWithdrawAmount("");
        console.log(`Success - ${transactionHash.hash}`);
      }
    } catch (err) {
      console.error(err);
      throw new Error("No ethereum object.");
    }
  }

  const getWithdrawTransactions = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ContractAddress,
          faucet.abi,
          provider
        );

        const withdrawTransactions =
          await contract.getAllWithdrawTransactions();
        const convertedWithdrawTransactions = withdrawTransactions.map(
          (transaction) => ({
            addressTo: transaction.sender,
            amount: ethers.utils.formatEther(transaction.amount),
          })
        );
        setTransactions(convertedWithdrawTransactions);
        setIsLoadingTransactions(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoadingTransactions(true);
    getWithdrawTransactions();
  }, []);

  return (
    <Wrapper>
      <DetailHeader>Get some rinkeby test Eth</DetailHeader>
      <TextInput>
        <input
          placeholder="Enter the withdraw amount..."
          id="text-input"
          type="number"
          name="amount"
          step="0.00001"
          onChange={(e) => setWithdrawAmount(e.target.value)}
          value={withdrawAmount}
        />
      </TextInput>
      {isLoading ? (
        <Load />
      ) : (
        <Button className="button" onClick={withdrawEther}>
          Send
        </Button>
      )}

      <AddressListWrapper>
        <AddressDetails>Last withdraw</AddressDetails>
        <AddressList>
          {isLoadingTransactions ? (
            <Load />
          ) : (
            <ul>
              {ReverseTransactions(transactions).map((transaction, i) => (
                <li key={`AddressAndAmount${i}`}>
                  <div className="transactionDetail">
                    <a
                      href={`https://rinkeby.etherscan.io/address/${transaction.addressTo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ShortenAddress(transaction.addressTo)}
                    </a>
                  </div>
                  <div className="transactionDetail">
                    {" "}
                    <a
                      href={`rinkeby.ethscan.io/address/${transaction.addressTo}`}
                    >{`${transaction.amount} Eth`}</a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AddressList>
      </AddressListWrapper>
    </Wrapper>
  );
};

export default Withdraw;

const Wrapper = styled.div`
  display: flex;
  width: 98%;
  height: 350px;
  // justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  .button:hover {
    opacity: 0.8;
    cursor: pointer;
    background: linear-gradient(65deg, #6dd5ed, #2193b0) no-repeat;
  }
  @media (max-width: 540px) {
    align-items: center;
  }
  background-color: #fdfdfd;
`;

const DetailHeader = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;
const TextInput = styled.div`
  width: 90%;
  #text-input {
    width: 100%;
    height: 40px;
    border: 1px solid #d4d4d4;
    border-radius: 6px;
    padding-left: 10px;
    font-weight: lighter;
    color: #999999;
    background-color: #fff;
    @media (max-width: 540px) {
      text-align: center;
    }
  }
  #text-input:focus {
    outline: none;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  background: linear-gradient(65deg, #2193b0, #6dd5ed) no-repeat;
  color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const AddressListWrapper = styled.div`
  width: 85vw;
  height: 160px;
  display: flex;
  flex-direction: column;
  @media (max-height: 540px) {
    height: auto;
  }
  @media (max-width: 540px) {
    width: 100%;
    align-items: center;
  }
`;
const AddressDetails = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin: 10px 0;
`;
const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  @media (max-width: 540px) {
    width: 100%;
  }
  ul {
    background-color: #fff;
    width: 100%;
    height: 160px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    padding: 5px 10px;
    overflow-y: scroll;
    @media (max-width: 540px) {
      align-items: center;
    }

    li {
      list-style: none;
      color: darkcyan;
      word-break: break-all;
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #dfdfdf;
      .transactionDetail a {
        text-decoration: none;
        color: darkcyan;
      }
    }
  }
`;
