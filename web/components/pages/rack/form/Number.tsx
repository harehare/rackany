import {
  FormControl,
  Label,
  Error,
  InputNumber,
  Description,
} from "components/shared/Form";
import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
} from "react-hook-form";

interface Props {
  name: string;
  displayName: string;
  description: string;
  defaultValue?: number;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Number: React.VFC<Props> = ({
  name,
  displayName,
  description,
  defaultValue = 0,
  required,
  register,
  errors,
}) => {
  return (
    <FormControl>
      <Label>{displayName}</Label>
      <Description>{description}</Description>
      <InputNumber
        {...register(name, { required })}
        defaultValue={defaultValue}
      />
      {errors[name] && <Error>{`${displayName} is required`}</Error>}
    </FormControl>
  );
};
