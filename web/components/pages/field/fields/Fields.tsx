import styled from "styled-components";
import {
  ImageLabel,
  TextLabel,
  NumberLabel,
  CheckLabel,
  EmailLabel,
  ListLabel,
  MarkdownLabel,
  LocationLabel,
  BarcodeLabel,
  QrCodeLabel,
} from "components/shared/FieldLabel";
import { TextBase } from "components/shared/Text";
import { useState } from "react";
import { Field } from "lib/generated/client";

interface Props {
  selectedFieldType?: Field;
  disabled?: boolean;
  onChanged: (field: Field) => void;
}

interface FieldProps {
  isSelected: boolean;
  handleClick: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 600px;
  margin: 8px;
`;

const FieldLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 280px;
  border: 1px solid var(--border-color);
  justify-content: flex-start;
  padding: 8px;
  background-color: ${(props) =>
    props.isSelected ? "var(--selected-color)" : "var(--rack-sub-color)"};
  cursor: pointer;
`;

const Text = styled(TextBase)`
  color: var(--text-color);
`;

const ImageField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <ImageLabel />
    <Text>Image</Text>
  </FieldLabel>
);

const TextField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <TextLabel />
    <Text>Text</Text>
  </FieldLabel>
);

const NumberField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <NumberLabel />
    <Text>Number</Text>
  </FieldLabel>
);

const CheckField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <CheckLabel />
    <Text>Check</Text>
  </FieldLabel>
);

const EmailField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <EmailLabel />
    <Text>Email</Text>
  </FieldLabel>
);

const ListField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <ListLabel />
    <Text>List</Text>
  </FieldLabel>
);

const MarkdownField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <MarkdownLabel />
    <Text>Markdown</Text>
  </FieldLabel>
);

const LocationField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <LocationLabel />
    <Text>Location</Text>
  </FieldLabel>
);

const BarcodeField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <BarcodeLabel />
    <Text>Barcode</Text>
  </FieldLabel>
);

const QrcodeField: React.VFC<FieldProps> = ({ isSelected, handleClick }) => (
  <FieldLabel isSelected={isSelected} onClick={handleClick}>
    <QrCodeLabel />
    <Text>Qrcode</Text>
  </FieldLabel>
);

export const Fields: React.VFC<Props> = ({
  selectedFieldType,
  disabled = false,
  onChanged,
}) => {
  const [selectedField, setSelectedField] = useState<Field>(
    selectedFieldType || Field.Text
  );

  const handleClick = (fieldType: Field) => {
    if (disabled) {
      return;
    }
    setSelectedField(fieldType);
    onChanged(fieldType);
  };

  return (
    <Container>
      <TextField
        isSelected={selectedField === "TEXT"}
        handleClick={() => {
          handleClick(Field.Text);
        }}
      />
      <NumberField
        isSelected={selectedField === "NUMBER"}
        handleClick={() => {
          handleClick(Field.Number);
        }}
      />
      <CheckField
        isSelected={selectedField === "CHECKBOX"}
        handleClick={() => {
          handleClick(Field.Checkbox);
        }}
      />
      <EmailField
        isSelected={selectedField === "EMAIL"}
        handleClick={() => {
          handleClick(Field.Email);
        }}
      />
      <LocationField
        isSelected={selectedField === "LOCATION"}
        handleClick={() => {
          handleClick(Field.Location);
        }}
      />
      <MarkdownField
        isSelected={selectedField === "MARKDOWN"}
        handleClick={() => {
          handleClick(Field.Markdown);
        }}
      />
      <ImageField
        isSelected={selectedField === "IMAGE"}
        handleClick={() => {
          handleClick(Field.Image);
        }}
      />
      <ListField
        isSelected={selectedField === "LIST"}
        handleClick={() => {
          handleClick(Field.List);
        }}
      />
      <BarcodeField
        isSelected={selectedField === "BARCODE"}
        handleClick={() => {
          handleClick(Field.Barcode);
        }}
      />
      <QrcodeField
        isSelected={selectedField === "QRCODE"}
        handleClick={() => {
          handleClick(Field.Qrcode);
        }}
      />
    </Container>
  );
};
