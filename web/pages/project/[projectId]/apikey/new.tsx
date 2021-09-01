import React from "react";
import Head from "next/head";
import NewApiKey from "components/pages/project/apiKeys/NewApiKey";
import Title from "components/shared/Title";
import { useRouter } from "next/router";
import { usePageDispatch } from "lib/context/PageContext";
import { useCreateApiKeyMutation } from "lib/generated/client";
import { errorNotify, successNotify } from "lib/notify";

const New: React.VFC = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [createApiKey, _] = useCreateApiKeyMutation();
  const setPage = usePageDispatch();
  setPage({
    project: projectId as string,
    collection: null,
    page: "CreateApiKey",
  });

  const onSubmit = async (data) => {
    await createApiKey({
      variables: {
        input: {
          name: data.name,
          projectId: projectId as string,
          role: data.role,
        },
      },
    }).catch(() => {
      errorNotify(`Failed to create api key`);
    });

    await router.replace(`/project/${projectId}/settings`);
    successNotify(`Successfully create api key`);
  };

  return (
    <>
      <Head>
        <title>New API Key | rackany</title>
      </Head>
      <Title title="New API Key" />
      <NewApiKey onSubmit={onSubmit} />
    </>
  );
};

export default New;
