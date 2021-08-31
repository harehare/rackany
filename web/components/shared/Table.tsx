import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

export const Table = styled.table`
  width: 100%;
  height: calc(100vh - 210px);
  border-spacing: 0;
`;
export const Thead = styled.thead`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;
export const TBody = styled.tbody`
  height: calc(100vh - 290px);
  overflow: scroll;
  display: block;
`;
export const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;
export const Th = styled.th`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
`;
export const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  margin: 8px;
  border-radius: 0.125rem;
  color: var(--text-color);
  background-color: var(--rack-sub-color);
  border: 1px solid var(--border-color);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const Td = styled.td`
  width: 100%;
  text-align: center;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableIcon = styled.div`
  font-size: 1.3rem;
  width: 32px;
  padding: 8px;
  color: var(--accent-color);
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const AscIcon = () => (
  <TableAscIcon>
    <FontAwesomeIcon icon={faSortUp} />
  </TableAscIcon>
);

export const DescIcon = () => (
  <TableDescIcon>
    <FontAwesomeIcon icon={faSortDown} />
  </TableDescIcon>
);

const TableAscIcon = styled.div`
  width: 16px;
  margin-bottom: -8px;
  margin-left: 4px;
`;

const TableDescIcon = styled.div`
  width: 16px;
  margin-bottom: 4px;
  margin-left: 4px;
`;
