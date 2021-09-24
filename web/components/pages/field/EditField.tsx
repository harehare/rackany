import React, { useEffect } from "react";
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
import { systemFields } from "lib/types/rack-row";
import { RackField } from "lib/generated/client";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Fields } from "components/pages/field/fields/Fields";
import { useTranslation } from "react-i18next";

interface Props {
  field: RackField;
  onSubmit: (data: any) => void;
}

const ToggleLabel = styled.label`
  display: flex;
  gap: 8px;
  color: var(--text-color);
  padding: 8px;
`;

const EditField: React.VFC<Props> = ({ field, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const handleChange = (name: string) => (e) => {
    setValue(name, e.target.checked);
  };

  useEffect(() => {
    setValue("sortable", field.sortable);
    setValue("stored", field.stored);
    setValue("requiredField", field.requiredField);
  }, [setValue, field]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Label>{t("name")}</Label>
        <Input
          {...register("name", {
            required: t("required_name") as string,
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
          defaultValue={field.name}
        />
        {errors.name && <Error>Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>{t("display_name")}</Label>
        <Input
          {...register("displayName", { required: true })}
          defaultValue={field.displayName}
        />
        {errors.displayName && <Error>Display Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>{t("description")}</Label>
        <Input {...register("description")} defaultValue={field.description} />
        {errors.description && <Error>Description is required</Error>}
      </FormControl>
      <FormControl>
        <Label>{t("field_type")}</Label>
        <Fields
          selectedFieldType={field.fieldType}
          disabled={true}
          onChanged={(fieldType) => {
            setValue("fieldType", fieldType);
          }}
        />
      </FormControl>
      <HFormControl>
        <ToggleLabel>
          <Toggle
            icons={false}
            defaultChecked={field.sortable}
            onChange={handleChange("sortable")}
          />
          <span>{t("sortable")}</span>
        </ToggleLabel>
        <ToggleLabel>
          <Toggle
            icons={false}
            defaultChecked={field.stored}
            onChange={handleChange("stored")}
          />
          <span>{t("stored")}</span>
        </ToggleLabel>
        <ToggleLabel>
          <Toggle
            icons={false}
            defaultChecked={field.requiredField}
            onChange={handleChange("requiredField")}
          />
          <span>{t("required")}</span>
        </ToggleLabel>
      </HFormControl>
      <Submit>{t("update")}</Submit>
    </Form>
  );
};

export default EditField;
