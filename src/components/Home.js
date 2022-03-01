import { React } from "react";
import styled from "styled-components";
import EthereumCard from "./EthereumCard.js";
import Withdraw from "./Withdraw.js";
import Donate from "./Donate.js";

function Home() {
  return (
    <Container>
      <EthereumCard />
      <Donate />
      <Withdraw />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 10px 0;
  @media (max-width: 540px) {
    padding-top: 60px;
  }
`;

// const SectionWrapper = styled.div`
//   display: flex;

//   justify-content: center;

//   width: 99%;
//   height: 700px;
//   border: 1px solid #d4d4d4;
//   border-radius: 2px;

//   background-color: #fdfdfd;
//   @media (max-height: 540px) {
//     height: auto;
//   }
//   // background-color: coral;
// `;
