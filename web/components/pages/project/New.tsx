import React from "react";
import { useForm } from "react-hook-form";
import {
  Label,
  FormControl,
  Form,
  Input,
  TextArea,
  Submit,
  Error,
} from "components/shared/Form";
import { useTranslation } from "next-i18next";

interface Props {
  onSubmit: (data: any) => void;
}

const New: React.VFC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <Error>{t("required_name")}</Error>}
      </FormControl>
      <FormControl>
        <Label>Display Name</Label>
        <Input {...register("displayName", { required: true })} />
        {errors.name && <Error>{t("required_display_name")}</Error>}
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <TextArea {...register("description", { required: true })} />
        {errors.description && <Error>{t("required_description")}</Error>}
      </FormControl>
      <Submit>Create</Submit>
    </Form>
  );
};

export default New;
