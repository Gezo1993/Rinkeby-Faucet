import React from "react";
import styled from "styled-components";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { SiEthereum } from "react-icons/si";
import Contacts from "./Contacts.js";

function Footer() {
  return (
    <Container>
      <PoweredbyAndDeleteContractWrapper>
        <Poweredby>
          <EthereumLogo />
          Powered by Ethereum
        </Poweredby>
      </PoweredbyAndDeleteContractWrapper>
      <NameAndContactWrapper>
        <NameDetail>
          Owen Imasiku
          <CopyRight />
          2022 (Rinkeby)
        </NameDetail>
        <Contacts />
      </NameAndContactWrapper>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //   align-items: center;
  background-color: #2193b0;
  width: 100%;
  height: auto;
  padding: 0 40px;
`;

const PoweredbyAndDeleteContractWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 20px 0;
  border-bottom: 1px solid #6bb5cb;
  @media (max-width: 540px) {
    // align-items: flex-start;
    flex-direction: column;
  }
`;

const Poweredby = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #fff;
`;

const EthereumLogo = styled(SiEthereum)`
  font-size: 21 px;
`;

const NameAndContactWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 20px 0;
  @media (max-width: 540px) {
    // align-items: flex-start;
    flex-direction: column;
  }
`;

const NameDetail = styled.div`
  display: flex;
  color: #fff;
`;

const CopyRight = styled(CopyrightIcon)`
  transform: scale(0.5);
`;
