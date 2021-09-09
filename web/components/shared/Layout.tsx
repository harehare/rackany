import React from "react";
import styled from "styled-components";
import Header from "components/shared/Header";
import { useRequiredLogin } from "hooks/useRequiredLogin";
import { useRouter } from "next/router";
import { usePageState } from "lib/context/PageContext";
import {
  useCollectionLazyQuery,
  useProjectLazyQuery,
} from "lib/generated/client";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  const { projectId } = router.query;
  const page = usePageState();

  const [loadProject, { called: calledProject, data: project }] =
    useProjectLazyQuery();

  const [loadCollection, { called: calledCollection, data: collection }] =
    useCollectionLazyQuery();

  if (isAuthenticated && !calledProject && projectId && !project) {
    loadProject({
      variables: {
        id: projectId as string,
      },
    });
  }

  if (
    isAuthenticated &&
    !calledCollection &&
    projectId &&
    page.collection &&
    !collection
  ) {
    loadCollection({
      variables: {
        id:
          typeof page.collection === "string"
            ? page.collection
            : page.collection?.id,
        projectId: projectId as string,
      },
    });
  }

  return (
    <Container>
      <Header
        // @ts-expect-error
        project={
          typeof page.project !== "string" && page.project
            ? page.project
            : project?.project
        }
        collection={
          typeof page.collection !== "string" && page.collection
            ? page.collection
            : collection?.collection
        }
        page={page.page}
      />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
