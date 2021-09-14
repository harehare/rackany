import React, { useCallback } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "components/shared/Logo";
import { Project, Collection } from "lib/generated/client";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Page } from "lib/types/page";
import SquareLoader from "react-spinners/SquareLoader";

interface Props {
  project?: Project;
  collection?: Collection;
  page: Page;
}

interface BreadcrumbProps {
  project?: Project;
  collection?: Collection;
  page: Page;
  handleHomeClick: () => void;
  handleProjectClick: () => void;
  handleCollectionClick: () => void;
}

const Container = styled.div`
  width: 100vw;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--main-color);
  border-bottom: 1px solid var(--border-color);
`;

const BreadcrumbLoadingContainer = styled.div`
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
`;

const Login = styled.div`
  cursor: pointer;
  font-weight: 800;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
`;

const NameContainer = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  line-height: 1rem;
`;

const Name = styled.div``;

const Logout = styled.div`
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LinkText = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text2-color);
  cursor: pointer;
  padding-right: 16px;
`;

const Text = styled.div`
  font-size: 0.9rem;
  color: var(--text3-color);
`;

const Icon = styled.div`
  width: 24px;
  color: var(--text3-color);
  font-size: 0.8rem;
  margin-top: 4px;
`;

const BreadcrumbArrow = () => (
  <Icon>
    <FontAwesomeIcon icon={faChevronRight} />
  </Icon>
);

const BreadcrumbLoading = () => (
  <BreadcrumbLoadingContainer>
    <SquareLoader color="#33884d" loading={true} size={16} />
  </BreadcrumbLoadingContainer>
);

const BreadcrumbList: React.VFC<BreadcrumbProps> = ({
  page,
  project,
  collection,
  handleHomeClick,
  handleProjectClick,
  handleCollectionClick,
}) => {
  const rest = () => {
    switch (page) {
      case "Index":
        return <></>;
      case "CreateApiKey":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            <Text>{"Create API Key"}</Text>
          </>
        );
      case "ProjectList":
        return <></>;
      case "Project":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
          </>
        );
      case "NewProject":
        return <></>;
      case "ProjectSettings":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            <Text>{"Settings"}</Text>
          </>
        );
      case "NewCollection":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            <Text>{"New Collection"}</Text>
          </>
        );
      case "Collection":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {collection ? <Text>{collection.name}</Text> : <></>}
          </>
        );
      case "CollectionSettings":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {collection ? (
              <LinkText onClick={handleCollectionClick}>
                {collection.name}
              </LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {<Text>{"Settings"}</Text>}
          </>
        );
      case "NewField":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {collection ? (
              <LinkText onClick={handleCollectionClick}>
                {collection.name}
              </LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {<Text>{"New Field"}</Text>}
          </>
        );
      case "EditField":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {collection ? (
              <LinkText onClick={handleCollectionClick}>
                {collection.name}
              </LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {<Text>{"Edit Field"}</Text>}
          </>
        );
      case "NewRackRow":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {collection ? (
              <LinkText onClick={handleCollectionClick}>
                {collection.name}
              </LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {<Text>{"New Data"}</Text>}
          </>
        );
      case "EditRackRow":
        return (
          <>
            <BreadcrumbArrow />
            {project ? (
              <LinkText onClick={handleProjectClick}>{project.name}</LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {collection ? (
              <LinkText onClick={handleCollectionClick}>
                {collection.name}
              </LinkText>
            ) : (
              <BreadcrumbLoading />
            )}
            <BreadcrumbArrow />
            {<Text>{"Edit Data"}</Text>}
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Breadcrumb>
      <LinkText onClick={handleHomeClick}>{"Home"}</LinkText>
      {rest()}
    </Breadcrumb>
  );
};

const Header: React.VFC<Props> = ({ project, collection, page }) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  const handleHomeClick = useCallback(() => {
    router.push(`/project`);
  }, [router]);

  const handleProjectClick = useCallback(() => {
    router.push(`/project/${project.id}`);
  }, [router, project]);

  const handleCollectionClick = useCallback(() => {
    router.push(`/project/${project.id}/collection/${collection.id}`);
  }, [router, project, collection]);

  return (
    <Container>
      <LogoContainer>
        <Logo />
        <BreadcrumbList
          project={project}
          collection={collection}
          handleHomeClick={handleHomeClick}
          handleProjectClick={handleProjectClick}
          handleCollectionClick={handleCollectionClick}
          page={page}
        />
      </LogoContainer>
      <Menu>
        {isLoading ? (
          <div />
        ) : isAuthenticated ? (
          <>
            <NameContainer>
              <Name>{user.email}</Name>
              <Logout onClick={logout}>LOGOUT</Logout>
            </NameContainer>
            <Image src={user.picture} alt={user.name} />
          </>
        ) : (
          <Login onClick={loginWithRedirect}>Sign In</Login>
        )}
      </Menu>
    </Container>
  );
};

export default Header;
