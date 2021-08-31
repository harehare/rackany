import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toFilterOperator, toOpString } from "lib/types/filter-operator";
import { RackRowFilter, FilterOperator } from "lib/generated/client";

interface Props {
  allowFieldNames: Set<string>;
  handleFilterChanged: (filters: RackRowFilter[]) => void;
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
  margin: 16px;
`;

const Icon = styled.div`
  position: absolute;
  left: 8px;
  font-size: 0.9rem;
  width: 16px;
`;

const Filters = styled.div`
  padding-left: 32px;
  display: flex;
  gap: 8px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-color);
  background-color: var(--accent-color);
  border: 1px solid var(--border-color);
  line-height: 30px;
  font-weight: 600;
  margin: 2px;
`;

const FilterText = styled.div`
  margin-left: 8px;
`;

const CloseIcon = styled.div`
  height: 100%;
  width: 8px;
  margin: 0 8px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding-left: 8px;
  width: 100%;
  height: 32px;
  color: var(--text-color);
`;

const getFilterOperator = (filter: string): [FilterOperator, string] => {
  if (filter.startsWith("<=")) {
    return [toFilterOperator("<="), filter.slice(2)];
  }
  if (filter.startsWith(">=")) {
    return [toFilterOperator(">="), filter.slice(2)];
  }
  if (filter.startsWith(">")) {
    return [toFilterOperator(">"), filter.slice(1)];
  }
  if (filter.startsWith("<")) {
    return [toFilterOperator("<"), filter.slice(1)];
  }
  if (filter.startsWith("!=")) {
    return [toFilterOperator("!="), filter.slice(1)];
  }

  return [toFilterOperator(""), filter];
};

export const Search: React.VFC<Props> = ({
  allowFieldNames,
  handleFilterChanged,
}) => {
  const [state, setState] = useState<{
    text: string;
    filters: RackRowFilter[];
  }>({
    text: "",
    filters: [],
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, text: e.target.value });
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tokens = state.text?.split(":");
      if (tokens.length !== 2) return;
      if (!allowFieldNames.has(tokens[0])) return;
      const [op, value] = getFilterOperator(tokens[1]);
      const row: RackRowFilter = {
        field: tokens[0],
        op,
        value,
      };
      const filters = [...state.filters, row];
      setState({
        text: "",
        filters,
      });
      handleFilterChanged(filters);
    } else if (e.key === "Backspace") {
      if (state.text.length > 0) return;
      const filters = state.filters.slice(0, -1);
      setState({
        ...state,
        filters,
      });
      handleFilterChanged(filters);
    }
  };

  const handleCloseClick = (field: string) => {
    setState({
      ...state,
      filters: state.filters.filter((f) => f.field !== field),
    });
    handleFilterChanged(state.filters);
  };

  return (
    <Container>
      <Filters>
        {state.filters.map((f) => (
          <Filter key={f.field}>
            <FilterText>{`${f.field}:${toOpString(f.op)}${
              f.value
            }`}</FilterText>
            <CloseIcon onClick={() => handleCloseClick(f.field)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
          </Filter>
        ))}
      </Filters>
      <SearchInput
        placeholder={[...allowFieldNames].map((f) => `${f}:value`).join(" ")}
        value={state.text}
        onInput={handleInput}
        onKeyDown={handleEnter}
      />
      <Icon>
        <FontAwesomeIcon icon={faSearch} />
      </Icon>
    </Container>
  );
};
