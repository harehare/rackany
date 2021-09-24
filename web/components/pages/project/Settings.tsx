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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        <Label>{t("name")}</Label>
        <Input
          {...register("name", { required: true })}
          defaultValue={project.name}
        />
        {errors.name && <Error>{t("required_name")}</Error>}
      </FormControl>

      <FormControl>
        <Label>{t("display_name")}</Label>
        <Input
          {...register("displayName", { required: true })}
          defaultValue={project.displayName}
        />
        {errors.name && <Error>{t("required_display_name")}</Error>}
      </FormControl>

      <FormControl>
        <Label>{t("description")}</Label>
        <TextArea
          {...register("description", { required: true })}
          defaultValue={project.description}
        />
        {errors.description && <Error>{t("required_description")}</Error>}
      </FormControl>
      <DangerZone
        title={t("delete_this_project_title")}
        buttonTitle={t("delete_project_title")}
        description={t("delete_project_description")}
        onClick={showModal}
      ></DangerZone>
      <Submit>{t("update")}</Submit>
    </Form>
  );
};

export default Info;
