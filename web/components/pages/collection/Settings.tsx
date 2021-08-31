import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useModal } from "react-modal-hook";
import {
  Form,
  FormControl,
  Label,
  Error,
  Input,
  TextArea,
  Submit,
  Select,
} from "components/shared/Form";
import DangerZone from "components/shared/DangerZone";
import { Collection } from "lib/generated/client";
import DeleteModal from "components/shared/DeleteModal";

interface Props {
  collection: Collection;
  fields: string[];
  onSubmit: (data: any) => void;
  onDeleteClick: (collectionId: string) => void;
}

const Container = styled.div`
  display: flex;
`;

const Settings: React.VFC<Props> = ({
  collection,
  fields,
  onSubmit,
  onDeleteClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, hideModal] = useModal(() => (
    <DeleteModal
      kind="collection"
      name={collection.name}
      show={showModal}
      hide={hideModal}
      onDeleteClick={() => onDeleteClick(collection.id)}
    />
  ));

  if (!collection) {
    return <></>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Label>Name</Label>
        <Input
          {...register("name", { required: true })}
          defaultValue={collection.name}
        />
        {errors.name && <Error>Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Display Name</Label>
        <Input
          {...register("displayName", { required: true })}
          defaultValue={collection.displayName}
        />
        {errors.name && <Error>Display Name is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <TextArea
          {...register("description", { required: true })}
          defaultValue={collection.description}
        />
        {errors.description && <Error>Description is required</Error>}
      </FormControl>
      <FormControl>
        <Label>Default sort by</Label>
        <Container>
          <Select
            {...register("defaultSortField")}
            defaultValue={collection.defaultSortField}
          >
            {fields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
          <Select
            {...register("defaultSortDirection")}
            defaultValue={collection.defaultSortDirection}
          >
            {["Asc", "Desc"].map((d) => (
              <option key={d} value={d.toUpperCase()}>
                {d}
              </option>
            ))}
          </Select>
        </Container>
      </FormControl>
      <DangerZone
        title="Delete this collection"
        buttonTitle="Delete collection"
        description="Once you delete a collection, there is no going back. Please be certain."
        onClick={showModal}
      ></DangerZone>
      <Submit>Edit</Submit>
    </Form>
  );
};

export default Settings;
