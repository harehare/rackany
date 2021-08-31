import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
} from "react-hook-form";
import styled from "styled-components";
import {
  FormControl,
  Label,
  Error,
  Input,
  Description,
} from "components/shared/Form";
import ReactBarcode from "react-barcode";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

const ImageContainer = styled.div`
  padding: 8px;
  transform: scale(0.5);
`;

interface Props {
  name: string;
  displayName: string;
  description: string;
  defaultValue?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Barcode: React.VFC<Props> = ({
  name,
  displayName,
  description,
  defaultValue = "",
  required,
  register,
  errors,
}) => {
  const [text, setText] = useState(defaultValue);

  return (
    <FormControl>
      <Label>{displayName}</Label>
      <Description>{description}</Description>
      <Input
        {...register(name, { required: `${name} is required`, maxLength: 48 })}
        defaultValue={defaultValue}
        onInput={(e) => {
          setText(e.target.value);
        }}
      />
      {errors[name] && <Error>{errors[name].message}</Error>}
      {text ? (
        <Container>
          <ImageContainer>
            <ReactBarcode
              value={text}
              width={2}
              height={100}
              displayValue={false}
            />
          </ImageContainer>
        </Container>
      ) : (
        <></>
      )}
    </FormControl>
  );
};
