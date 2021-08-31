import styled from "styled-components";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export const FullscreenButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  z-index: 50;
  color: var(--text-color);
  cursor: pointer;
`;

export const Container = styled.div`
  position: fixed;
  display: flex;
  top: var(--header-height);
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: calc(100vw - var(--header-height));
  z-index: 50;
  color: var(--text-color);
  background-color: var(--rack-background-color);
  cursor: pointer;
`;

export const Line = styled.div`
  width: 4px;
  z-index: 50;
  background-color: var(--text-color);
`;

export const EditorPane = styled.div`
  width: 100%;
  height: calc(100vw - var(--header-height));
`;

export const Editor = styled(TextArea)`
  width: 100%;
  height: calc(100vw - 90px);
  margin: 0;
  border-radius: 0;
  outline: none;
  border: none;
  color: var(--text-color);
`;

export const PreviewPane = styled.div`
  width: 100%;
  height: calc(100vw - var(--header-height));
  padding: 8px;
`;

interface Props {
  name: string;
  displayName: string;
  description: string;
  defaultValue?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const Markdown: React.VFC<Props> = ({
  name,
  displayName,
  description,
  defaultValue = "",
  required,
  register,
  errors,
}) => {
  const [state, setState] = useState({ text: "", fullscreen: false });

  return state.fullscreen ? (
    <MarkdownEditor
      name={name}
      text={state.text}
      register={register}
      handleFullscreenClick={() =>
        setState({ ...state, fullscreen: !state.fullscreen })
      }
      handleTextChanged={(text) => {
        setState({ ...state, text });
      }}
    />
  ) : (
    <FormControl>
      <Label>{displayName}</Label>
      <Description>{description}</Description>
      <TextArea
        placeHolder="Markdown"
        {...register(name, {
          required: required ? `${displayName} is required` : false,
        })}
        defaultValue={defaultValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, text: e.target.value });
        }}
      />
      {errors[name] && <Error>{errors[name].message}</Error>}
      <FullscreenButton
        onClick={() => setState({ ...state, fullscreen: !state.fullscreen })}
      >
        {state.fullscreen ? (
          <FontAwesomeIcon icon={faCompress} />
        ) : (
          <FontAwesomeIcon icon={faExpand} />
        )}
      </FullscreenButton>
    </FormControl>
  );
};

interface EditorProps {
  name: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  handleFullscreenClick: () => void;
  handleTextChanged: (text: string) => void;
}

const MarkdownEditor: React.VFC<EditorProps> = ({
  name,
  text,
  register,
  handleFullscreenClick,
  handleTextChanged,
}) => {
  return (
    <Container>
      <EditorPane>
        <Editor
          {...register(name)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleTextChanged(e.target.value);
          }}
        >
          {text}
        </Editor>
      </EditorPane>
      <Line />
      <PreviewPane>
        <ReactMarkdown>{text}</ReactMarkdown>
      </PreviewPane>
      <FullscreenButton onClick={handleFullscreenClick}>
        <FontAwesomeIcon icon={faCompress} />
      </FullscreenButton>
    </Container>
  );
};
