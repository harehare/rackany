import styled from "styled-components";
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
import { useState } from "react";

export const LatLonForm = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin: 8px;
  width: 600px;
`;

export const InputLatitude = styled(InputNumber).attrs({
  type: "number",
  min: -90.0,
  max: 90.0,
  step: 0.000001,
})`
  width: 290px;
`;

export const InputLongitude = styled(InputNumber).attrs({
  type: "number",
  min: -180.0,
  max: 180.0,
  step: 0.000001,
})`
  width: 290px;
`;

interface Props {
  name: string;
  displayName: string;
  description: string;
  defaultLatitude?: number;
  defaultLongitude?: number;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Location: React.VFC<Props> = ({
  name,
  displayName,
  description,
  defaultLatitude = 0.0,
  defaultLongitude = 0.0,
  required,
  register,
  errors,
}) => {
  const [latLon, setLatLon] = useState({ latitude: 0.0, longitude: 0.0 });

  return (
    <FormControl>
      <Label>{displayName}</Label>
      <Description>{description}</Description>
      <LatLonForm>
        <InputLatitude
          {...register(`${name}Lat`, {
            required: required ? `latitude is required` : false,
            pattern: {
              value: /^[0-9\.]+$/,
              message: "Invalid latitude",
            },
          })}
          defaultValue={defaultLatitude}
          placeholder="35.681236,139.767125"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLatLon({
              ...latLon,
              latitude: parseFloat(e.target.value)
                ? parseFloat(e.target.value)
                : 0.0,
            });
          }}
        />
        <InputLongitude
          {...register(`${name}Lon`, {
            required: required ? `longitude is required` : false,
            pattern: {
              value: /^[0-9\.]+$/,
              message: "Invalid longitude",
            },
          })}
          defaultValue={defaultLongitude}
          placeholder="35.681236,139.767125"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLatLon({
              ...latLon,
              longitude: parseFloat(e.target.value)
                ? parseFloat(e.target.value)
                : 0.0,
            });
          }}
        />
      </LatLonForm>
      {errors[`${name}Lat`] && <Error>{errors[`${name}Lat`].message}</Error>}
      {errors[`${name}Lon`] && <Error>{errors[`${name}Lon`].message}</Error>}
    </FormControl>
  );
};
