import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Form,
  FormControl,
  Label,
  Error,
  Input,
  Submit,
  HFormControl,
} from "components/shared/Form";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Fields } from "components/pages/field/fields/Fields";
import { systemFields } from "lib/types/rack-row";

interface Props {
  onSubmit: (data: any) => void;
}

const ToggleLabel = styled.label`
  display: flex;
  gap: 8px;
  color: var(--text-color);
  padding: 8px;
`;

const NewField: React.VFC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChange = (name: string) => (e) => {
    setValue(name, e.target.checked);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Label>Name</Label>
        <Input
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[0-9a-zA-Z\.\-\_]+$/,
              message: "Invalid name",
            },
            validate: {
              message: (v: string) =>
                systemFields.includes(v.toLowerCase())
                  ? `${v} is invalid field name`
                  : null,
            },
          })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormControl>
      <FormControl>
        <Label>Display Name</Label>
        <Input
          {...register("displayName", {
            required: true,
          })}
        />
        {errors.displayName && <Error>Display Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <Input {...register("description")} />
        {errors.description && <Error>Description is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Field Type</Label>
        <Fields
          onChanged={(fieldType) => {
            setValue("fieldType", fieldType);
          }}
        />
      </FormControl>
      <HFormControl>
        <ToggleLabel>
          <Toggle icons={false} onChange={handleChange("sortable")} />
          <span>Sortable</span>
        </ToggleLabel>
        <ToggleLabel>
          <Toggle icons={false} onChange={handleChange("stored")} />
          <span>Stored</span>
        </ToggleLabel>
        <ToggleLabel>
          <Toggle icons={false} onChange={handleChange("requiredField")} />
          <span>RequiredField</span>
        </ToggleLabel>
      </HFormControl>
      <Submit>Create</Submit>
    </Form>
  );
};

export default NewField;
