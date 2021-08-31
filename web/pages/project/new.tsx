import React, { useEffect } from "react";
import Head from "next/head";
import NewProject from "components/pages/project/New";
import Title from "components/shared/Title";
import { usePageDispatch } from "lib/context/PageContext";
import {
  ProjectsDocument,
  useCreateProjectMutation,
} from "lib/generated/client";
import { useRouter } from "next/router";
import { errorNotify, successNotify } from "lib/notify";
import gql from "graphql-tag";

const New: React.VFC = () => {
  const [createProject] = useCreateProjectMutation();
  const router = useRouter();
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({ project: null, collection: null, page: "NewProject" });
  });

  const onSubmit = async (data) => {
    await createProject({
      variables: {
        input: {
          name: data.name,
          displayName: data.displayName,
          description: data.description,
        },
      },
    })
      .then(async () => {
        await router.replace(`/project`);
        successNotify(`Successfully created project ${data.displayName}`);
      })
      .catch(() => {
        errorNotify(`Failed to created ${data.name}`);
      });
  };

  return (
    <>
      <Head>
        <title>New Project | rackany</title>
      </Head>
      <Title title="New Project" />
      <NewProject onSubmit={onSubmit} />
    </>
  );
};

export default New;
