import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "components/shared/Title";
import EditField from "components/pages/field/EditField";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { usePageDispatch } from "lib/context/PageContext";
import { useCollectionQuery, useSaveFieldMutation } from "lib/generated/client";
import { toError } from "graphql/error/error";
import { errorNotify, successNotify } from "lib/notify";

const Edit: React.VFC = () => {
  const router = useRouter();
  const { projectId, collectionId, fieldId } = router.query;
  const {
    loading,
    error,
    data: collection,
  } = useCollectionQuery({
    ssr: false,
    variables: {
      id: collectionId as string,
      projectId: projectId as string,
    },
  });
  const [saveFields, canSaveFields] = useSaveFieldMutation();
  const setPage = usePageDispatch();
  setPage({
    project: projectId as string,
    collection: collection?.collection,
    page: "EditField",
  });

  if (loading) return <Loading />;
  if (error) return <Error errors={error.graphQLErrors.map(toError)} />;

  const fields = collection?.collection.rackFields ?? [];
  const field = fields.filter((f) => f.id === fieldId);

  if (field.length <= 0) {
    return <Loading />;
  }

  const onSubmit = async (editData) => {
    // TODO:
    if (!canSaveFields) {
      return;
    }

    const input = fields.map((f, i) => {
      return f.id === fieldId
        ? {
            id: f.id,
            name: editData.name,
            displayName: editData.displayName,
            description: editData.description || "",
            fieldType: f.fieldType,
            order: f.order,
            sortable: !!editData.sortable,
            stored: !!editData.stored,
            requiredField: !!editData.requiredField,
          }
        : {
            id: f.id,
            name: f.name,
            displayName: f.displayName,
            description: f.description,
            fieldType: f.fieldType,
            order: i,
            sortable: f.sortable,
            stored: f.stored,
            requiredField: f.requiredField,
          };
    });
    await saveFields({
      variables: {
        projectId: projectId as string,
        collectionId: collection?.collection.id,
        input,
      },
    })
      .then(async () => {
        await router.replace(
          `/project/${projectId}/collection/${collection?.collection.id}`
        );
        successNotify(`Successfully updated fields ${editData.displayName}`);
      })
      .catch(() => {
        errorNotify(`Failed to update fields ${editData.displayName}`);
      });
  };

  return (
    <>
      <Head>
        <title>Edit Field | rackany</title>
      </Head>
      <Title title="Edit Field" />
      <EditField field={field[0]} onSubmit={onSubmit} />
    </>
  );
};

export default Edit;
