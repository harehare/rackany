import {
  FormControl,
  Label,
  Error,
  Input,
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
  defaultValue?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Email: React.VFC<Props> = ({
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
      <Input
        {...register(name, {
          required: required ? `${displayName} is required` : false,
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email",
          },
        })}
        defaultValue={defaultValue}
        placeholder="test@rackany.com"
      />
      {errors[name] && <Error>{errors[name].message}</Error>}
    </FormControl>
  );
};
