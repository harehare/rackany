import React, { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewDataRow from "components/pages/rack/NewRackRow";
import Title from "components/shared/Title";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { createInput } from "lib/types/rack-row";
import { usePageDispatch } from "lib/context/PageContext";
import { useEffect } from "react";
import {
  useCollectionQuery,
  useCreateRackRowMutation,
} from "lib/generated/client";
import { toError } from "graphql/error/error";
import { errorNotify, successNotify } from "lib/notify";

const New: React.VFC = () => {
  const router = useRouter();
  const { projectId, collectionId } = router.query;
  const {
    loading,
    data: collection,
    error,
  } = useCollectionQuery({
    ssr: false,
    variables: {
      id: collectionId as string,
      projectId: projectId as string,
    },
  });
  const [createRow] = useCreateRackRowMutation();
  const onSubmit = useCallback(
    async (data) => {
      await createRow({
        variables: {
          collectionId: collectionId as string,
          projectId: projectId as string,
          input: await createInput(collection?.collection?.rackFields, data),
        },
      })
        .then(async () => {
          await router.replace(
            `/project/${projectId}/collection/${collectionId as string}`
          );
          successNotify(`Successfully created row`);
        })
        .catch(() => {
          errorNotify(`Failed to create row`);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, createRow]
  );
  const setPage = usePageDispatch();
  useEffect(() => {
    setPage({
      // @ts-expect-error
      project: collection?.project,
      collection: collection?.collection,
      page: "NewRackRow",
    });
  });

  if (!collection) return <></>;

  return (
    <>
      <Head>
        <title>New Data | rackany</title>
      </Head>
      <Title title="New Data" />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error errors={error.graphQLErrors.map(toError)} />
      ) : (
        <NewDataRow
          rackFields={collection?.collection?.rackFields}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default New;
