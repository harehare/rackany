import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EditDataRow from "components/pages/rack/EditRackRow";
import Title from "components/shared/Title";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { updateInput } from "lib/types/rack-row";
import { usePageDispatch } from "lib/context/PageContext";
import {
  useCollectionQuery,
  useDeleteRackRowMutation,
  useRackRowQuery,
  useUpdateRackRowMutation,
} from "lib/generated/client";
import { toError } from "graphql/error/error";
import { errorNotify, successNotify } from "lib/notify";

const Edit: React.VFC = () => {
  const router = useRouter();
  const { projectId, collectionId, rackRowId } = router.query;
  const {
    loading: collectionLoading,
    error: collectionError,
    data: collection,
  } = useCollectionQuery({
    ssr: false,
    variables: {
      id: collectionId as string,
      projectId: projectId as string,
    },
  });
  const {
    loading: dataRowLoading,
    error: dataRowError,
    data: rackRow,
  } = useRackRowQuery({
    variables: {
      collectionId: collectionId as string,
      projectId: projectId as string,
      rackRowId: rackRowId as string,
    },
  });
  const [updateDataRow] = useUpdateRackRowMutation();
  const [deleteDataRow] = useDeleteRackRowMutation();

  const setPage = usePageDispatch();
  useEffect(() => {
    setPage({
      // @ts-expect-error
      project: collection?.project,
      collection: collection?.collection,
      page: "EditRackRow",
    });
  });

  const onSubmit = useCallback(
    async (data) => {
      if (!rackRow) {
        return;
      }

      await updateDataRow({
        variables: {
          collectionId: collectionId as string,
          projectId: projectId as string,
          rackRowId: rackRowId as string,
          input: await updateInput(
            collection.collection?.rackFields,
            rackRow.rackRow,
            data
          ),
        },
      })
        .then(async () => {
          await router.replace(
            `/project/${projectId}/collection/${collection?.collection.id}`
          );
          successNotify(`Successfully updated row`);
        })
        .catch(() => {
          errorNotify(`Failed to update row`);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, rackRow, updateDataRow]
  );

  return (
    <>
      <Head>
        <title>Edit Data | rackany</title>
      </Head>
      <Title title="Edit Data" />
      {collectionLoading || dataRowLoading ? (
        <Loading />
      ) : collectionError || dataRowError ? (
        <Error
          errors={[
            ...(collectionError
              ? collectionError.graphQLErrors.map(toError)
              : []),
            ...(dataRowError ? [dataRowError] : []),
          ]}
        />
      ) : (
        <EditDataRow
          rackFields={collection?.collection.rackFields}
          dataRow={rackRow?.rackRow}
          handleSubmitClick={onSubmit}
          handleDeleteClick={async () => {
            await deleteDataRow({
              variables: {
                input: {
                  collectionId: collectionId as string,
                  projectId: projectId as string,
                  rackRowId: rackRowId as string,
                },
              },
            });

            await router.replace(
              `/project/${projectId}/collection/${collection?.collection.id}`
            );
            successNotify(`Successfully deleted data`);
          }}
        />
      )}
    </>
  );
};

export default Edit;
