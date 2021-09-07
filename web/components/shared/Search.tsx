import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  text: string;
  placeholder: string;
  handleInput: (text: string) => void;
}

const Container = styled.div`
  background-color: var(--rack-sub-color);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  padding: 0 64px 0 0;
  min-height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 0.125rem;
  margin: 16px 0;
`;

const Icon = styled.div`
  position: absolute;
  left: 8px;
  font-size: 0.9rem;
  width: 16px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding-left: 32px;
  width: 100%;
  height: 32px;
  color: var(--text-color);
`;

export const Search: React.VFC<Props> = ({
  text,
  placeholder,
  handleInput,
}) => {
  return (
    <Container>
      <SearchInput
        placeholder={placeholder}
        value={text}
        onInput={(e) => {
          handleInput(e.target.value);
        }}
      />
      <Icon>
        <FontAwesomeIcon icon={faSearch} />
      </Icon>
    </Container>
  );
};
