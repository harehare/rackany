import React from "react";
import styled from "styled-components";
import media from "styled-media-query";

interface Props {
  name: string;
  children: React.ReactNode | null;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  width: 24%;
  height: 320px;
  flex-basis: 24%;
  background-color: var(--rack-sub-color);
  border-radius: 0.125rem;
  padding: 0 16px 16px 16px;
  margin: 0 16px 16px 0;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: transform 0.1s;
  cursor: pointer;
  position: relative;
  overflow-y: scroll;
  ${media.lessThan("medium")`
    width: 45%;
    flex-basis: 45%;
    height: 160px;
  `}
  &:hover {
    &:after {
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 320px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const Title = styled.div`
  font-weight: 600;
  position: relative;
  display: flex;
  align-items: center;
  color: var(--text-color);
  padding: 8px 0 16px 0;
`;

const Text = styled.div`
  font-size: 1.25rem;
  padding: 8px 0 16px 0;
`;

const RackListItem: React.VFC<Props> = ({ name, onClick, children }) => {
  return (
    <Container
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <Title>
        <Text>{name}</Text>
      </Title>
      {children}
    </Container>
  );
};

export default RackListItem;
