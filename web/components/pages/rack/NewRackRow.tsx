import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, Submit } from "components/shared/Form";
import { Field, RackField } from "lib/generated/client";
import { Text } from "./form/Text";
import { Number } from "./form/Number";
import { Email } from "./form/Email";
import { Location } from "./form/Location";
import { Markdown } from "./form/Markdown";
import { Image } from "./form/Image";
import { List } from "./form/List";
import { Check } from "./form/Check";
import { Barcode } from "./form/Barcode";
import { Qrcode } from "./form/Qrcode";

const Container = styled.div`
  height: calc(100vh - 120px);
  overflow-y: scroll;
  position: relative;
`;

interface Props {
  rackFields: RackField[];
  onSubmit: (data: any) => void;
}

const NewRackRow: React.VFC<Props> = ({ rackFields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {rackFields.map((f) => {
          switch (f.fieldType) {
            case Field.Text:
              return (
                <Text
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
            case Field.Number:
              return (
                <Number
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
            case Field.Checkbox:
              return (
                <Check
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  required={f.requiredField}
                  setValue={setValue}
                />
              );
            case Field.Email:
              return (
                <Email
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
            case Field.Location:
              return (
                <Location
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
            case Field.Markdown:
              return (
                <Markdown
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
            case Field.Image:
              return (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  register={register}
                  setValue={setValue}
                  required={f.requiredField}
                  errors={errors}
                />
              );
            case Field.List:
              return (
                <List
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );

            case Field.Barcode:
              return (
                <Barcode
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );

            case Field.Qrcode:
              return (
                <Qrcode
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
          }
        })}
        <Submit>Create</Submit>
      </Form>
    </Container>
  );
};

export default NewRackRow;
