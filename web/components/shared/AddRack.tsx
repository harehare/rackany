import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import media from "styled-media-query";

interface Props {
  href: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 320px;
  flex-basis: 24%;
  color: var(--border-disabled-color);
  border: var(--border-width) dashed var(--border-disabled-color);
  border-radius: 0.125rem;
  padding: 16px;
  cursor: pointer;
  font-size: 0.5rem;
  margin: 0 16px 16px 0;
  transition: transform 0.1s;
  position: relative;
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

const Icon = styled.div`
  font-size: 1.5rem;
  width: 48px;
`;

const AddRack: React.VFC<Props> = ({ href }) => {
  return (
    <Link href={href} passHref>
      <Container>
        <Icon>
          <FontAwesomeIcon icon={faPlus} />
        </Icon>
      </Container>
    </Link>
  );
};

export default AddRack;
