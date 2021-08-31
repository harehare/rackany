import React from "react";
import { useForm } from "react-hook-form";
import {
  Label,
  FormControl,
  Form,
  Input,
  TextArea,
  Submit,
  Error,
} from "components/shared/Form";
import { useModal } from "react-modal-hook";
import { Project } from "lib/generated/client";
import DangerZone from "components/shared/DangerZone";
import DeleteModal from "components/shared/DeleteModal";
import Loading from "components/shared/Loading";

interface Props {
  project?: Project;
  onSubmit: (data: any) => void;
  onDeleteClick: (projectId: string) => void;
}

const Info: React.VFC<Props> = ({ project, onSubmit, onDeleteClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModal, hideModal] = useModal(() => (
    <DeleteModal
      kind="project"
      name={project.name}
      show={showModal}
      hide={hideModal}
      onDeleteClick={() => onDeleteClick(project.id)}
    />
  ));

  if (!project) {
    return <Loading />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Label>Name</Label>
        <Input
          {...register("name", { required: true })}
          defaultValue={project.name}
        />
        {errors.name && <Error>Name is required</Error>}
      </FormControl>

      <FormControl>
        <Label>Display Name</Label>
        <Input
          {...register("displayName", { required: true })}
          defaultValue={project.displayName}
        />
        {errors.name && <Error>Display Name is required</Error>}
      </FormControl>

      <FormControl>
        <Label>Description</Label>
        <TextArea
          {...register("description", { required: true })}
          defaultValue={project.description}
        />
        {errors.description && <Error>Description is required</Error>}
      </FormControl>
      <DangerZone
        title="Delete this project"
        buttonTitle="Delete project"
        description="Once you delete a project, there is no going back. Please be certain."
        onClick={showModal}
      ></DangerZone>
      <Submit>Update</Submit>
    </Form>
  );
};

export default Info;
