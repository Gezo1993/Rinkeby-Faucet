import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Header() {
  const [currentAccount, setCurrentAccount] = useState("");
  const CheckIfAccountIsConnected = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } else {
      alert("Please install metamask.");
    }
  };

  useEffect(() => {
    CheckIfAccountIsConnected();
  }, []);

  const ConnectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);
      } else {
        alert("Please install metamask.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    }
  };

  return (
    <Container>
      <Logo>Rinkeby Faucet</Logo>
      {!currentAccount && (
        <ConnectButton id="walletButton" onClick={ConnectWallet}>
          Connect Wallet
        </ConnectButton>
      )}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(65deg, #6dd5ed, #2193b0) no-repeat;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  #walletButton:hover {
    cursor: pointer;
    background: linear-gradient(85deg, #6dd5ed, #2cc3c4) no-repeat;
  }
  @media (max-width: 540px) {
    #walletButton {
      width: 120px;
    }
    position: fixed;
    opacity: 0.95;
  }
`;

const Logo = styled.div`
  display: flex;
  // width: 50vw;
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
`;

const ConnectButton = styled.div`
  width: 150px;
  height: 40px;
  background: linear-gradient(85deg, #2cc3c4, #6dd5ed) no-repeat;
  color: #fff;
  padding: 5px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  // background: linear-gradient(65deg, #6dd5ed, #2193b0) no-repeat;
`;
