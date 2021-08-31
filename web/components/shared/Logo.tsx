import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-color);
  cursor: pointer;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  color: var(--text-color);
  padding: 4px;
`;

const Text = styled.div`
  font-family: "Kanit", sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  padding-bottom: 4px;
  padding-left: 4px;
`;

const Logo: React.VFC = () => (
  <Link href="/" passHref>
    <Container>
      <Image src="/logo.svg" alt="logo" />
      <Text>rackany</Text>
    </Container>
  </Link>
);

export default Logo;
