import React from "react";
import styled from "styled-components";
import { AccentButton } from "components/shared/Form";

interface Props {
  title: string;
  buttonTitle: string;
  description: string;
  onClick: () => void;
}

const Container = styled.div`
  width: 585px;
  height: 200px;
  border: 1px solid var(--error-color);
  padding: 8px;
  margin: 16px;
  border-radius: 0.125rem;
`;

const Title = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--error-color);
  padding: 0 0 16px 0;
  font-weight: 800;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--text-color);
  font-weight: 800;
`;

const Description = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--text-color);
  padding: 0 0 16px 0;
`;

const DangerZone: React.VFC<Props> = ({
  title,
  buttonTitle,
  description,
  onClick,
}) => {
  return (
    <Container>
      <Title>Danger zone</Title>
      <SubTitle>{title}</SubTitle>
      <Description>{description}</Description>
      <AccentButton onClick={onClick}>{buttonTitle}</AccentButton>
    </Container>
  );
};

export default DangerZone;
