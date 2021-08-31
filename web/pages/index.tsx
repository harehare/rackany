import React, { useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import LoginButton from "components/shared/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { TextBase } from "components/shared/Text";
import LargeLogo from "components/shared/LargeLogo";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--main-color);
  padding-top: 7rem;
`;

const Hero = styled.div`
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
`;

const Text = styled(TextBase)`
  margin-top: 1rem;
  font-weight: 600;
  color: var(--text3-color);
`;

const Home: React.VFC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/project");
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Home | rackany</title>
      </Head>
      <Container>
        <Hero>
          <LargeLogo />
          <Text>
            Define arbitrary fields and expose a restful api. no coding
            required.
          </Text>
        </Hero>
        <LoginButton handleClick={loginWithRedirect} />
      </Container>
    </>
  );
};

export default Home;
