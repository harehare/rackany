import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button } from "components/shared/Form";
import { Text3xl, TextBase } from "components/shared/Text";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SubTitle = styled(Text3xl)`
  font-weight: 600;
`;

const Text = styled(TextBase)`
  padding: 16px;
`;

const NotFound: React.VFC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>NotFound | rackany</title>
      </Head>
      <Container>
        <SubTitle>Not Found</SubTitle>
        <Text>The project was not found.</Text>
        <Button
          onClick={() => {
            router.push("/project");
          }}
        >
          Show Projects
        </Button>
      </Container>
    </>
  );
};

export default NotFound;
