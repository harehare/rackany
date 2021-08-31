import React from "react";
import { useForm } from "react-hook-form";
import {
  Label,
  FormControl,
  Form,
  Input,
  Select,
  Submit,
  Error,
} from "components/shared/Form";

interface Props {
  onSubmit: (data: any) => void;
}

const NewApiKey: React.VFC<Props> = ({ onSubmit }) => {
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
        <Label>Field Type</Label>
        <Select {...register("role", { required: true })}>
          <option value="READ_ONLY">Read Only</option>
          <option value="READ_AND_WRITE">Read&amp;Write</option>
        </Select>
        {errors.fieldType && <Error>Role is required</Error>}
      </FormControl>
      <Submit>Create</Submit>
    </Form>
  );
};

export default NewApiKey;
