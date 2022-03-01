import React from "react";
import styled from "styled-components";

function Loader() {
  return (
    <LoaderWrapper>
      <Load id="loader" />
    </LoaderWrapper>
  );
}

export default Loader;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  margin-top: 10px;
  padding: 3px 0;
`;

const Load = styled.div`
  border-bottom-width: 2px;
  border-color: rgb(33, 147, 176);
  border-bottom-style: solid;
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;
