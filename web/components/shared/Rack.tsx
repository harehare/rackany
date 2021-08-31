import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

interface Props {
  name: string;
  description?: string;
  children: React.ReactNode | null;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void | null;
  onSettingsClick: (e: React.MouseEvent<HTMLInputElement>) => void | null;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--rack-background-color);
  padding: 0 16px 16px 16px;
  margin: 0 16px 16px 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
`;

const ScrollArea = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height) - 156px);
  overflow-y: auto;
`;

const Title = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: var(--text-color);
  padding: 8px 0 16px 0;
`;

const Text = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  padding: 8px 0 16px 0;
`;

const Icon = styled.div`
  width: 24px;
  position: absolute;
  right: -4px;
`;

const Rack: React.VFC<Props> = ({
  name,
  onClick = null,
  onSettingsClick,
  children,
}) => {
  return (
    <Container
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <Title>
        <Text>{name}</Text>
        <Icon
          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
            e.stopPropagation();
            if (onSettingsClick) {
              onSettingsClick(e);
            }
          }}
        >
          <FontAwesomeIcon icon={faCog} />
        </Icon>
      </Title>
      <ScrollArea>{children}</ScrollArea>
    </Container>
  );
};

export default Rack;
