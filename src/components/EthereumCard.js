import React, { useState, useEffect } from "react";
import Loader from "./Loader.js";
import styled from "styled-components";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers } from "ethers";
import faucet from "../artifacts/contracts/Faucet.sol/faucet.json";
import { ShortenAddress } from "../utils/shortenAddress.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ContractAddress = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;
const ContractOwner = `${process.env.REACT_APP_CONTRACT_OWNER}`;

function EthereumCard() {
  const [balance, setBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  const CheckIfAccountIsConnected = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.filter((account) => account === ContractOwner).length) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } else {
      alert("Please install metamask");
    }
  };

  const getContractBalance = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          ContractAddress,
          faucet.abi,
          provider
        );

        const BalanceOfContract = await contract.balanceOfContract();
        const FormattedContractBalance =
          ethers.utils.formatEther(BalanceOfContract);
        setBalance(FormattedContractBalance);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  async function destructContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ContractAddress, faucet.abi, signer);

      try {
        const transactionHash = await contract.destroy();
        const ContractBalance = await contract.balanceOfContract();
        const formatedBalance = ethers.utils.formatEther(ContractBalance);
        console.log(`Destructing contract: ${ContractAddress}`);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Sucess - ${transactionHash.hash}`);
        console.log(`Contract: ${ContractAddress} destructed!!!`);
        console.log(`${formatedBalance}} ether sent to owner of the contract`);
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    CheckIfAccountIsConnected();
    setIsLoading(true);
    getContractBalance();
  }, []);

  return (
    <CardWrapper>
      <Card>
        <EthereumWrapper>
          <IconsWrapper>
            <EthereumIconWrapper>
              <EthereumIcon />
            </EthereumIconWrapper>
            <InfoIcon />
          </IconsWrapper>
          <BalanceWrapper>
            {isLoading ? <Loader id="loader" /> : `${balance} Ether`}
          </BalanceWrapper>
          <AddressAndDeleteContractWrapper>
            <EthereumAddressWrapper>
              <p className="address">{ShortenAddress(ContractAddress)}</p>
              <p className="ethereum">Ethereum</p>
            </EthereumAddressWrapper>
            {isOwner && (
              <DeleteContractWrapper id="delete">
                <DeleteContract onClick={destructContract} />
              </DeleteContractWrapper>
            )}
          </AddressAndDeleteContractWrapper>
        </EthereumWrapper>
      </Card>
    </CardWrapper>
  );
}

export default EthereumCard;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  background-color: #fdfdfd;
  height: 250px;
  margin-bottom: 10px;
  padding: 0 10px;
`;
const Card = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 25px;
  background: linear-gradient(
      65deg,
      #6dd5ed,
      #2193b0,
      #2cc3c4,
      #29d5d2,
      #6dd5ed
    )
    no-repeat;
  padding: 0.74rem;
  @media (max-width: 540px) {
    width: 98%;
  }
`;

const EthereumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const BalanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  color: #fff;
  #loader {
    border-color: #fff;
  }
`;

const AddressAndDeleteContractWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  #delete:hover {
    cursor: pointer;
  }
`;

const EthereumIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border-width: 2px;
  border-color: #ffffff;
  border-style: solid;
`;

const EthereumIcon = styled(SiEthereum)`
  font-size: 21px;
  color: #fff;
`;

const InfoIcon = styled(BsInfoCircle)`
  font-size: 17px;
  color: #fff;
`;
const EthereumAddressWrapper = styled.div`
  display: flex,
  justify-content: center;
  align-items: center;
  .address {
    color: #fff;
    font-weight: light;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .ethereum {
    color: #fff;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
`;

const DeleteContractWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteContract = styled(DeleteForeverIcon)`
  color: #fff;
`;
