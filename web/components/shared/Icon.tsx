import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const Icon = styled.div`
  color: #33884d;
`;

export const Database = (
  <Icon>
    <FontAwesomeIcon icon={faDatabase} />
  </Icon>
);
