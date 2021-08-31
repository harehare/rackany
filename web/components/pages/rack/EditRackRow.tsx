import React from "react";
import { confirmAlert } from "react-confirm-alert";
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
import { Dialog } from "components/shared/Dialog";
import {
  RackRow,
  toCheckBox,
  toEmail,
  toImage,
  toList,
  toLocation,
  toMarkdown,
  toNumber,
  toText,
} from "lib/types/rack-row";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Barcode } from "./form/Barcode";
import { Qrcode } from "./form/Qrcode";

const Container = styled.div`
  height: calc(100vh - 120px);
  overflow-y: scroll;
  position: relative;
`;

const DeleteButton = styled.div`
  color: var(--error-color);
  padding: 8px;
  font-weight: 600;
  cursor: pointer;
`;

interface Props {
  rackFields: RackField[];
  dataRow: RackRow;
  handleSubmitClick: (data: any) => void;
  handleDeleteClick: () => void;
}

const EditDataRow: React.VFC<Props> = ({
  rackFields,
  dataRow,
  handleSubmitClick,
  handleDeleteClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onDeleteClick = () =>
    confirmAlert({
      overlayClassName: "overlay",
      // eslint-disable-next-line react/display-name
      customUI: ({ onClose }) => (
        <Dialog
          title="Delete data"
          message="Are you absolutely sure?"
          onClose={onClose}
          onDelete={() => {
            handleDeleteClick();
            onClose();
          }}
        />
      ),
    });

  if (!rackFields) return <></>;
  return (
    <Container>
      <Form onSubmit={handleSubmit(handleSubmitClick)}>
        {rackFields.map((f) => {
          switch (f.fieldType) {
            case Field.Text:
              return (
                <Text
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  defaultValue={toText(dataRow.data[f.name])}
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
                  defaultValue={toNumber(dataRow.data[f.name])}
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
                  defaultChecked={toCheckBox(dataRow.data[f.name])}
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
                  defaultValue={toEmail(dataRow.data[f.name])}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
            case Field.Location:
              const [lat, lon] = toLocation(dataRow.data[f.name]);
              return (
                <Location
                  key={f.id}
                  name={f.name}
                  displayName={f.displayName}
                  description={f.description}
                  defaultLatitude={lat}
                  defaultLongitude={lon}
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
                  defaultValue={toMarkdown(dataRow.data[f.name])}
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
                  defaultValue={toImage(dataRow.data[f.name])}
                  required={f.requiredField}
                  setValue={setValue}
                  register={register}
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
                  defaultValue={toList(dataRow.data[f.name])}
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
                  defaultValue={toText(dataRow.data[f.name])}
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
                  defaultValue={toText(dataRow.data[f.name])}
                  required={f.requiredField}
                  register={register}
                  errors={errors}
                />
              );
          }
        })}
        <Submit>Update</Submit>
        <DeleteButton onClick={onDeleteClick}>Delete this row</DeleteButton>
      </Form>
    </Container>
  );
};

export default EditDataRow;
