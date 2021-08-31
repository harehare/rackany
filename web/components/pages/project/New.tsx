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

interface Props {
  onSubmit: (data: any) => void;
}

const New: React.VFC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} />
        {errors.name && <Error>Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Display Name</Label>
        <Input {...register("displayName", { required: true })} />
        {errors.name && <Error>Display Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <TextArea {...register("description", { required: true })} />
        {errors.description && <Error>Description is required</Error>}
      </FormControl>
      <Submit>Create</Submit>
    </Form>
  );
};

export default New;
