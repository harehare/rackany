import styled from "styled-components";

interface Props {
  title: string;
  message: string;
  onClose: () => void;
  onDelete: () => void;
}

const Container = styled.div`
  text-align: center;
  width: 500px;
  padding: 40px;
  background: var(--accent-color);
  box-shadow: 0 20px 75px rgb(0 0 0 / 23%);
  color: #fff;
  border-radius: 0.125rem;
`;

const Button = styled.button`
  width: 160px;
  padding: 10px;
  border: 1px solid #fff;
  margin: 10px;
  cursor: pointer;
  background: none;
  color: #fff;
  font-size: 14px;
`;

export const Dialog: React.VFC<Props> = ({
  title,
  message,
  onDelete,
  onClose,
}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <p>{message}</p>
      <Button onClick={onClose}>CANCEL</Button>
      <Button
        onClick={() => {
          onDelete();
        }}
      >
        OK
      </Button>
    </Container>
  );
};
