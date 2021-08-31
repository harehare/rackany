import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  href: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  color: var(--border-disabled-color);
  border: var(--border-width) dashed var(--border-disabled-color);
  border-radius: 0.125rem;
  padding: 16px;
  cursor: pointer;
  font-size: 0.5rem;
  margin: 0 16px 16px 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.div`
  font-size: 1.3rem;
  width: 16px;
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
