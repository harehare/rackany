import React from "react";
import styled from "styled-components";
import { TextLg } from "./Text";

interface Props {
  title: string;
}

const Container = styled(TextLg)`
  font-size: 1.125rem;
  font-weight: 800;
  padding: 16px;
  text-align: center;
  background-color: var(--main-color);
`;

const Title: React.VFC<Props> = ({ title }) => <Container>{title}</Container>;

export default Title;
