import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "components/shared/Title";
import Project from "components/pages/project/Project";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { usePageDispatch } from "lib/context/PageContext";
import { useProjectQuery } from "lib/generated/client";

const Index: React.VFC = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { data, loading, error } = useProjectQuery({
    variables: {
      id: projectId && (projectId as string),
    },
  });
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      // @ts-expect-error
      project: data?.project,
      collection: null,
      page: "Project",
    });
  });

  const projectName = data ? data.project.name : "";

  return (
    <>
      <Head>
        <title>{`${projectName} | rackany`}</title>
      </Head>
      <Title title="Project" />
      {loading ? (
        <Loading />
      ) : error ? (
        error ? (
          <Error errors={[error]} />
        ) : (
          <></>
        )
      ) : (
        <Project
          // @ts-expect-error
          project={data?.project}
          handleClick={(c) => () => {
            router.push(`/project/${projectId}/collection/${c.id}`);
          }}
          handleSettingsClick={() => {
            router.push(`/project/${projectId}/settings`);
          }}
        />
      )}
    </>
  );
};

export default Index;
