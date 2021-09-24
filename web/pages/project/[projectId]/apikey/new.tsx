import React from "react";
import Head from "next/head";
import NewApiKey from "components/pages/project/apiKeys/NewApiKey";
import Title from "components/shared/Title";
import { useRouter } from "next/router";
import { usePageDispatch } from "lib/context/PageContext";
import { useCreateApiKeyMutation, useProjectQuery } from "lib/generated/client";
import { errorNotify, successNotify } from "lib/notify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const New: React.VFC = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { data } = useProjectQuery({
    variables: {
      id: projectId as string,
    },
  });
  const [createApiKey, _] = useCreateApiKeyMutation();
  const { t } = useTranslation();
  const setPage = usePageDispatch();
  setPage({
    // @ts-expect-error
    project: data?.project,
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
      errorNotify(t("message_failed_to_create_api_key"));
    });

    await router.replace(`/project/${projectId}/settings`);
    successNotify(t("message_successfully_to_create_api_key"));
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

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default New;
