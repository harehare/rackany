import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { Input } from "components/shared/Form";
import { AccentButton } from "components/shared/Form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  kind: "project" | "collection";
  name: string;
  show: () => void;
  hide: () => void;
  onDeleteClick: () => void;
}

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    backgroundColor: "var(--rack-background-color)",
    borderRadius: "1rem",
    padding: "1.5rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Container = styled.div`
  position: relative;
`;

const InputName = styled(Input)`
  width: 600px;
  margin: 16px 0;
`;

const Title = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--text-color);
  padding: 0 0 16px 0;
  font-weight: 800;
`;

const Body = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--text-color);
`;

const Name = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--text-color);
  font-weight: 800;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -16px;
  right: -24px;
  width: 32px;
  height: 32px;
  font-size: 1.25rem;
  color: var(--text-color);
  cursor: pointer;
`;

const DeleteModal: React.VFC<Props> = ({ kind, name, hide, onDeleteClick }) => {
  const [typeText, setText] = useState("");
  return (
    <ReactModal isOpen style={modalStyle}>
      <Container>
        <Title>Delete {kind}</Title>
        <Body>Are you sure you want to delete this {kind}?</Body>
        <Body>
          Please type <Name>{name}</Name> to confirm.
        </Body>
        <InputName
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        ></InputName>
        <AccentButton
          onClick={() => {
            onDeleteClick();
            hide();
          }}
          disabled={typeText !== name}
        >
          Delete this {kind}
        </AccentButton>
        <CloseButton onClick={hide}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
      </Container>
    </ReactModal>
  );
};

export default DeleteModal;
