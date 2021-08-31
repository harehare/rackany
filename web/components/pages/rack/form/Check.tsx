import { FormControl } from "components/shared/Form";
import styled from "styled-components";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import Toggle from "react-toggle";
import "react-toggle/style.css";

interface Props {
  name: string;
  displayName: string;
  defaultChecked?: boolean;
  required: boolean;
  setValue: UseFormSetValue<FieldValues>;
}

const ToggleLabel = styled.label`
  display: flex;
  gap: 8px;
  color: var(--text-color);
  padding: 8px;
`;

export const Check: React.VFC<Props> = ({
  name,
  displayName,
  defaultChecked = false,
  setValue,
}) => {
  const handleChange = (e) => {
    setValue(name, e.target.checked);
  };

  return (
    <FormControl>
      <ToggleLabel>
        <Toggle
          icons={false}
          defaultChecked={defaultChecked}
          onChange={handleChange}
        />
        <span>{displayName}</span>
      </ToggleLabel>
    </FormControl>
  );
};
