import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewCollection from "components/pages/collection/New";
import Title from "components/shared/Title";
import { usePageDispatch } from "lib/context/PageContext";
import {
  ProjectDocument,
  useCreateCollectionMutation,
} from "lib/generated/client";
import { errorNotify, successNotify } from "lib/notify";

const New: React.VFC = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [createCollection] = useCreateCollectionMutation();
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      project: projectId as string,
      collection: null,
      page: "NewCollection",
    });
  });

  const onSubmit = async (data) => {
    await createCollection({
      variables: {
        input: {
          name: data.name,
          projectId: projectId as string,
          displayName: data.displayName,
          description: data.description,
        },
      },
      refetchQueries: [
        {
          query: ProjectDocument,
          variables: { id: projectId },
        },
      ],
    })
      .then(async () => {
        await router.replace(`/project/${projectId as string}`);
        successNotify(`Successfully created ${data.name}`);
      })
      .catch(() => {
        errorNotify(`Failed to created ${data.name}`);
      });
  };

  return (
    <>
      <Head>
        <title>New Collection | rackany</title>
      </Head>
      <Title title="New Collection" />
      <NewCollection onSubmit={onSubmit} />
    </>
  );
};

export default New;
