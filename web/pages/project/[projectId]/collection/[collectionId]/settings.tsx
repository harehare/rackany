import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CollectionSettings from "components/pages/collection/Settings";
import Title from "components/shared/Title";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { Container } from "components/shared/Container";
import { usePageDispatch } from "lib/context/PageContext";
import {
  useCollectionQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from "lib/generated/client";
import { toError } from "graphql/error/error";
import { errorNotify, successNotify } from "lib/notify";

const Settings: React.VFC = () => {
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
  const [updateCollection] = useUpdateCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      project: projectId as string,
      collection: collection?.collection,
      page: "CollectionSettings",
    });
  });

  const onSubmit = useCallback(
    async (data) => {
      await updateCollection({
        variables: {
          input: {
            id: collectionId as string,
            name: data.name ?? collection?.collection.name,
            projectId: projectId as string,
            displayName: data.displayName ?? collection?.collection.displayName,
            description: data.description ?? collection?.collection.description,
            defaultSortField: data.defaultSortField ?? "updated_at",
            defaultSortDirection: data.defaultSortDirection
              ? data.defaultSortDirection.toUpperCase()
              : "DESC",
          },
        },
      })
        .then(async () => {
          await router.replace(
            `/project/${projectId}/collection/${collection?.collection.id}`
          );
          successNotify(`Successfully updated ${data.name}`);
        })
        .catch(() => {
          errorNotify(`Failed to updated ${data.name}`);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateCollection, projectId, collectionId, collection]
  );

  if (!collection) {
    return <Loading />;
  }

  const onDeleteClick = async () => {
    await deleteCollection({
      variables: {
        input: {
          id: collectionId as string,
        },
      },
    });
    await router.replace(`/project/${projectId}`);
    successNotify(`Successfully deleted`);
  };

  const collectionName = collection
    ? `Settings: ${collection?.collection.name}`
    : "";

  return (
    <>
      <Head>
        <title>{`${collectionName} | rackany`}</title>
      </Head>
      <Title title="Settings" />
      {loading ? (
        <Loading />
      ) : error ? (
        error ? (
          <Error errors={error.graphQLErrors.map(toError)} />
        ) : (
          <></>
        )
      ) : (
        <Container>
          <CollectionSettings
            collection={collection?.collection}
            fields={[
              "created_at",
              "updated_at",
              ...collection?.collection.rackFields
                .filter((f) => f.sortable)
                .map((f) => f.name),
            ]}
            onSubmit={onSubmit}
            onDeleteClick={onDeleteClick}
          />
        </Container>
      )}
    </>
  );
};

export default Settings;
