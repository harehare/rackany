import React from "react";
import styled from "styled-components";
import { Button } from "components/shared/Form";

interface Props {
  handleClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: #ffffff;
  border-radius: 0.125rem;
  padding: 16px;
  cursor: pointer;
`;

const Logo: React.VFC<Props> = ({ handleClick }) => (
  <Container onClick={handleClick}>
    <Button>Sign In</Button>
  </Container>
);

export default Logo;
