import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
} from "react-hook-form";
import {
  FormControl,
  Label,
  Error,
  Input,
  Description,
} from "components/shared/Form";

interface Props {
  name: string;
  displayName: string;
  description: string;
  defaultValue?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Text: React.VFC<Props> = ({
  name,
  displayName,
  description,
  defaultValue = "",
  required,
  register,
  errors,
}) => {
  return (
    <FormControl>
      <Label>{displayName}</Label>
      <Description>{description}</Description>
      <Input {...register(name, { required })} defaultValue={defaultValue} />
      {errors[name] && <Error>{`${displayName} is required`}</Error>}
    </FormControl>
  );
};
