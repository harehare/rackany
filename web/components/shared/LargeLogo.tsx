import React from "react";
import styled from "styled-components";
import { Text3xl } from "./Text";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-color);
  cursor: pointer;
  justify-content: center;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
  color: var(--text-color);
  padding: 8px;
`;

const Text = styled(Text3xl)`
  font-weight: 600;
  padding-bottom: 8px;
`;

const LargeLogo: React.VFC = () => (
  <Container>
    <Image src="/logo.svg" alt="logo" />
    <Text>Build your own database</Text>
  </Container>
);

export default LargeLogo;
