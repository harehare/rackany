import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "components/shared/Title";
import NewField from "components/pages/field/NewField";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { usePageDispatch } from "lib/context/PageContext";
import { useCollectionQuery, useSaveFieldMutation } from "lib/generated/client";
import { toError } from "graphql/error/error";
import { errorNotify, successNotify } from "lib/notify";

const New: React.VFC = () => {
  const router = useRouter();
  const { projectId, collectionId } = router.query;
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
  const [saveFields] = useSaveFieldMutation();
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      // @ts-expect-error
      project: collection?.project,
      collection: collection?.collection,
      page: "NewField",
    });
  });

  const onSubmit = useCallback(
    async (data) => {
      const fields = collection?.collection.rackFields ?? [];

      // TODO:
      if (fields.filter((f) => f.name === data.name).length > 0) {
        return;
      }

      const currentFields = fields.map((f, i) => ({
        id: f.id,
        name: f.name,
        displayName: f.displayName,
        description: f.description,
        fieldType: f.fieldType,
        order: i,
        sortable: f.sortable,
        stored: f.stored,
        requiredField: f.requiredField,
      }));
      const newField = {
        id: null,
        name: data.name,
        displayName: data.displayName,
        description: data.description || "",
        fieldType: data.fieldType || "TEXT",
        order: currentFields.length,
        sortable: !!data.sortable,
        stored: !!data.stored,
        requiredField: !!data.requiredField,
      };
      await saveFields({
        variables: {
          projectId: projectId as string,
          collectionId: collection?.collection.id,
          input: [...currentFields, newField],
        },
      })
        .then(async () => {
          await router.replace(
            `/project/${projectId}/collection/${collection?.collection.id}`
          );
          successNotify(`Successfully created data`);
        })
        .catch(() => {
          errorNotify(`Failed to create data`);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection?.collection.rackFields, saveFields]
  );

  return (
    <>
      <Head>
        <title>New Field | rackany</title>
      </Head>
      <Title title="New Field" />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error errors={error.graphQLErrors.map(toError)} />
      ) : (
        <NewField onSubmit={onSubmit} />
      )}
    </>
  );
};

export default New;
