import {
  FormControl,
  Label,
  Error,
  TextArea,
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

export const List: React.VFC<Props> = ({
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
      <TextArea
        {...register(name, {
          required: required ? `${displayName} is required` : false,
        })}
        defaultValue={defaultValue}
      />
      {errors[name] && <Error>{errors[name].message}</Error>}
    </FormControl>
  );
};
