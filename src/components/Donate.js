import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckIcon from "@mui/icons-material/Check";
import { ethers } from "ethers";
import faucet from "../artifacts/contracts/Faucet.sol/faucet.json";
import { ShortenAddress } from "../utils/shortenAddress";
import { ReverseTransactions } from "../utils/ReverseTransactions";
import Loader from "./Loader.js";

const ContractAddress = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;

function Donate() {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const copyToClipboard = () => {
    const text = ContractAddress;
    const temp = document.createElement("input");
    temp.setAttribute("value", text);
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    console.log(`${text} copied to clipboard!!!`);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const getDepositTransactions = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ContractAddress,
          faucet.abi,
          provider
        );

        const depositTransactions = await contract.getAllDepositTransactions();
        const convertedDepositTransactions = depositTransactions.map(
          (transaction) => ({
            addressFrom: transaction.sender,
            amount: ethers.utils.formatEther(transaction.amount),
          })
        );
        setTransactions(convertedDepositTransactions);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDepositTransactions();
  }, []);

  return (
    <Wrapper>
      <DetailHeader>Donate some rinkeby test Eth</DetailHeader>
      <ContractAndCopyWrapper>
        <ContractDetail>Contract</ContractDetail>
        <AddressWrapper id="address">
          {ShortenAddress(ContractAddress)}
          <CopyToClipboardWrapper
            id="clipboardEffect"
            onClick={copyToClipboard}
          >
            {isCopied ? <Check /> : <CopyToClipboard />}
          </CopyToClipboardWrapper>
        </AddressWrapper>
      </ContractAndCopyWrapper>

      <AddressListWrapper>
        <AddressDetails>Last Donations</AddressDetails>
        <AddressList>
          {isLoading ? (
            <Loader />
          ) : (
            <ul>
              {ReverseTransactions(transactions).map((transaction, i) => (
                <li key={`addressAmount${i}`}>
                  <div className="transactionDetail">
                    <a
                      href={`https://rinkeby.etherscan.io/address/${transaction.addressFrom}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ShortenAddress(transaction.addressFrom)}
                    </a>
                  </div>
                  <div className="transactionDetail">
                    {" "}
                    <a
                      href={`rinkeby.ethscan.io/address/${transaction.addressFrom}`}
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
}

export default Donate;

const Wrapper = styled.div`
  display: flex;
  width: 98%;
  height: 300px;
  padding: 10px;
  margin-bottom: 10px;
  // justify-content: center;
  // align-items: flex-start;
  flex-direction: column;
  .button:hover {
    opacity: 0.8;
    cursor: pointer;
    background: linear-gradient(65deg, #6dd5ed, #2193b0) no-repeat;
  }
  #clipboardEffect:hover {
    background-color: #888888;
    color: #fff;
    cursor: pointer;
  }
  @media (max-width: 540px) {
    align-items: center;
  }
  background-color: #fdfdfd;
`;

const DetailHeader = styled.div`
  font-size: 1rem;
  font-weight: bold;
  // margin-top: 20px;
  // margin-bottom: 10px;
`;

const ContractAndCopyWrapper = styled.div`
  width: 200px;
  height: auto;
  // padding: 0 10px;
  display: flex;

  justify-content: space-between;
  align-items: center;

  // background-color: coral;
`;

const ContractDetail = styled.div`
  font-size: 1rem;
  // font-weight: bold;
  color: 444444;
`;
const AddressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 40%;
  color: #999999;
`;
const CopyToClipboardWrapper = styled.div`
  height: 30px;
  width: 30px;
  padding: 4px;
  margin-left: 10px;
  border-radius: 50%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888888;
`;
const Check = styled(CheckIcon)`
  transform: scale(0.6);
`;
const CopyToClipboard = styled(FileCopyIcon)`
  transform: scale(0.6);
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
      word-break: break-all;
      padding: 5px;
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
