import React from "react";
import styled from "styled-components";
import SquareLoader from "react-spinners/SquareLoader";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading: React.VFC = () => {
  return (
    <Container>
      <SquareLoader color="#33884d" loading={true} size={50} />
    </Container>
  );
};

export default Loading;
