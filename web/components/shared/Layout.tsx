import React from "react";
import styled from "styled-components";
import Header from "components/shared/Header";
import { useRequiredLogin } from "hooks/useRequiredLogin";
import { usePageState } from "lib/context/PageContext";

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.main`
  height: calc(100vh - var(--header-height) - 56px);
`;

const Layout: React.VFC<Props> = ({ children }) => {
  useRequiredLogin({ redirectUri: null });
  const page = usePageState();

  return (
    <Container>
      <Header
        project={page.project}
        collection={page.collection}
        page={page.page}
      />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
