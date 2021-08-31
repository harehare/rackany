import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import {
  Label,
  Description,
  FormControl,
  Error,
  InputFile,
} from "components/shared/Form";
import {
  FieldValues,
  DeepMap,
  FieldError,
  UseFormSetValue,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  name: string;
  displayName: string;
  description: string;
  defaultValue?: string | null;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Container = styled.div`
  height: auto;
  margin: 8px;
  border: 3px dashed var(--border-color);
  border-radius: 0.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 180px;
`;

export const Img = styled.img`
  height: auto;
  object-fit: contain;
  margin: 16px;
  width: 100%;
  max-height: 240px;
`;

export const UploadArea = styled.div`
  color: var(--text-color);
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const UploadText = styled.div`
  font-weight: 600;
`;

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result as string);
      },
      false
    );
    reader.readAsDataURL(file);
  });
};

export const Image: React.VFC<Props> = ({
  name,
  displayName,
  description,
  defaultValue = null,
  register,
  required,
  setValue,
  errors,
}) => {
  const [loadedFile, loadFile] = useState<string | null>();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        return;
      }
      const text = await readFile(acceptedFiles[0]);
      loadFile(text);
      setValue(name, text);
    },
    [name, setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (!defaultValue) return;
    setValue(name, defaultValue);
  });

  return (
    <FormControl>
      <Label>{displayName}</Label>
      <Description>{description}</Description>
      <Container>
        <UploadArea {...getRootProps()}>
          <UploadText>
            {!loadedFile
              ? isDragActive
                ? "Drop file"
                : "Drag and Drop file here or Click Upload file"
              : ""}
          </UploadText>
          <InputFile
            accept="image/*"
            {...register(name, {
              required: required ? `${displayName} is required` : false,
            })}
            {...getInputProps()}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files || e.target.files.length === 0) {
                return;
              }
              const text = await readFile(e.target.files[0]);
              loadFile(text);
              setValue(name, text);
            }}
          />
          {loadedFile || defaultValue ? (
            <Img src={loadedFile ?? defaultValue} alt={displayName} />
          ) : (
            <></>
          )}
        </UploadArea>
        {errors[name] && <Error>{errors[name].message}</Error>}
      </Container>
    </FormControl>
  );
};
