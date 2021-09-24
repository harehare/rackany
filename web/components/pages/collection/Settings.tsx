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
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation();
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
        <Label>{t("name")}</Label>
        <Input
          {...register("name", { required: true })}
          defaultValue={collection.name}
        />
        {errors.name && <Error>{t("required_name")}</Error>}
      </FormControl>
      <FormControl>
        <Label>{t("display_name")}</Label>
        <Input
          {...register("displayName", { required: true })}
          defaultValue={collection.displayName}
        />
        {errors.name && <Error>{t("required_display_name")}</Error>}
      </FormControl>
      <FormControl>
        <Label>{t("description")}</Label>
        <TextArea
          {...register("description", { required: true })}
          defaultValue={collection.description}
        />
        {errors.description && <Error>{t("required_description")}</Error>}
      </FormControl>
      <FormControl>
        <Label>{t("default_sort_by")}</Label>
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
            {[t("asc"), t("desc")].map((d) => (
              <option key={d} value={d.toUpperCase()}>
                {d}
              </option>
            ))}
          </Select>
        </Container>
      </FormControl>
      <DangerZone
        title={t("delete_this_collection_title")}
        buttonTitle={t("delete_collection_title")}
        description={t("delete_collection_description")}
        onClick={showModal}
      ></DangerZone>
      <Submit>{t("Edit")}</Submit>
    </Form>
  );
};

export default Settings;
