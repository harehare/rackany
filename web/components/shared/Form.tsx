import styled from "styled-components";

export const Input = styled.input`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 24px;
  padding: 16px;
  border-radius: 0.125rem;
  outline: none;
  color: var(--text-color);
  background-color: var(--rack-sub-color);
  margin: 8px;
  font-family: var(--font-family);
  border: 1px solid var(--border-color);
`;

export const InputNumber = styled(Input).attrs({
  type: "number",
})``;

export const InputFile = styled(Input).attrs({
  type: "file",
})`
  height: 56px;
  display: none;
`;

export const CheckBox = styled.input.attrs({
  type: "checkbox",
})`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 24px;
  padding: 16px;
  border-radius: 0.125rem;
  outline: none;
  color: var(--text-color);
  background-color: var(--rack-sub-color);
  margin: 8px;
  font-family: var(--font-family);
`;

export const CheckBoxLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 24px;
  padding: 16px;
  border-radius: 0.125rem;
  outline: none;
  color: var(--text-color);
  margin: 8px;
`;

export const TextArea = styled.textarea`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 160px;
  padding: 16px;
  border: var(--border-width) solid var(--border-color);
  border-radius: 0.125rem;
  color: var(--text-color);
  background-color: var(--rack-sub-color);
  margin: 8px;
  font-family: var(--font-family);
  border: 1px solid var(--border-color);
  resize: none;
  outline: none;
`;

export const ButtonBase = styled.button`
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  min-width: 64px;
  vertical-align: middle;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  background-color: var(--accent-color);
  color: var(--text-color);
  cursor: pointer;
  font-weight: 600;
  font-family: var(--font-family);
  font-size: 1rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background-color: rgba(51, 136, 77, 0.9);
  }
`;

export const Button = styled(ButtonBase).attrs({ type: "button" })``;
export const Submit = styled(ButtonBase).attrs({ type: "submit" })``;
export const AccentButton = styled(ButtonBase).attrs({ type: "button" })`
  width: 240px;
  background-color: var(--error-color);
  color: var(--text-color);
  &:hover {
    background-color: rgba(224, 58, 76, 0.7);
  }
`;

export const Select = styled.select`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px 16px;
  border-radius: 0.125rem;
  outline: none;
  color: var(--text-color);
  background-color: var(--rack-sub-color);
  margin: 8px;
  font-family: var(--font-family);
  border: 1px solid var(--border-color);
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--rack-background-color);
  width: 100%;
  padding: 16px;
`;

export const Label = styled.div`
  color: var(--text-color);
  padding: 0 8px;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const Description = styled.div`
  color: var(--text-color);
  padding: 0 8px;
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const Error = styled.div`
  color: var(--text-color);
  font-weight: 800;
  font-size: 0.85rem;
  background-color: var(--error-color);
  line-height: 12p;
  padding: 8px;
  margin: 0 8px 8px;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  margin-bottom: 16px;
`;

export const HFormControl = styled.div`
  display: flex;
  position: relative;
  padding: 16px;
  width: 600px;
  display: flex;
  justify-content: space-around;
`;
