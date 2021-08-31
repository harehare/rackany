import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "components/shared/Title";
import ProjectList from "components/pages/project/ProjectList";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { usePageDispatch } from "lib/context/PageContext";
import { useProjectsQuery } from "lib/generated/client";

const ProjectListIndex: React.VFC = () => {
  const router = useRouter();
  const { data, loading, error } = useProjectsQuery({ ssr: false });
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      project: null,
      collection: null,
      page: "ProjectList",
    });
  });

  return (
    <>
      <Head>
        <title>All Project | rackany</title>
      </Head>
      <Title title="All Project" />
      {loading ? (
        <Loading />
      ) : error ? (
        error ? (
          <Error errors={[error]} />
        ) : (
          <></>
        )
      ) : (
        <ProjectList
          // @ts-expect-error
          projects={data ? data.projects : []}
          handleClick={(p) => () => {
            router.push(`/project/${p.id}`);
          }}
          handleItemClick={(p, c) => () => {
            router.push(`/project/${p.id}/collection/${c.id}`);
          }}
        />
      )}
    </>
  );
};

export default ProjectListIndex;
