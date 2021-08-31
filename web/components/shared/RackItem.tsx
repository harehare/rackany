import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  description?: string;
  labels?: string[];
  icon?: JSX.Element;
  disabled?: boolean;
  actionButton?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onIconClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.1)" : "var(--rack-sub-color)"};
  border-radius: 0.125rem;
  margin: 0 16px 16px 0;
  border: 1px solid var(--border-color);
  &:hover {
    background-color: var(--selected-color);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  padding: 16px;
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: ${(props) => props.margin};
`;

const Description = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
`;

const Labels = styled.div`
  display: flex;
  padding: 8px;
  text-transform: capitalize;
  font-weight: 600;
`;

const Label = styled.div`
  color: var(--text-color);
  background-color: var(--accent-color);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 4px 16px;
  border-radius: 0.25rem;
  margin-left: 8px;
`;

const Icon = styled.div`
  padding-right: 8px;
  margin-right: 8px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RackItem: React.VFC<Props> = ({
  name,
  description = "",
  icon = null,
  labels = [],
  disabled = false,
  actionButton = null,
  onClick = null,
  onIconClick = null,
}) => {
  return (
    <Container
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <Title>
        {icon === null ? (
          <div />
        ) : (
          <Icon onClick={onIconClick ? onIconClick : () => {}}>{icon}</Icon>
        )}
        <TextContainer>
          <Text>{name}</Text>
          <Description>{description}</Description>
        </TextContainer>
      </Title>
      <ActionContainer>
        <Labels>
          {labels
            .filter((l) => l)
            .map((l) => (
              <Label key={l}>{l}</Label>
            ))}
        </Labels>
        {actionButton ? actionButton : <></>}
      </ActionContainer>
    </Container>
  );
};

export default RackItem;
