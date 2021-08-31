import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
import ProjectSettings from "components/pages/project/Settings";
import ApiKeys from "components/pages/project/apiKeys/ApiKeys";
import Title from "components/shared/Title";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { Container } from "components/shared/Container";
import { usePageDispatch } from "lib/context/PageContext";
import {
  useDeleteProjectMutation,
  useProjectQuery,
  useRevokeApiKeyMutation,
  useUpdateProjectMutation,
} from "lib/generated/client";
import { errorNotify, successNotify } from "lib/notify";

const Settings: React.VFC = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { projectId } = router.query;
  const {
    loading,
    error,
    data: project,
  } = useProjectQuery({
    ssr: false,
    variables: {
      id: projectId as string,
    },
  });
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [revokeApiKey] = useRevokeApiKeyMutation();
  const onSubmit = useCallback(
    async (data) => {
      await updateProject({
        variables: {
          input: {
            id: projectId as string,
            name: data.name,
            displayName: data.displayName,
            description: data.description,
          },
        },
      })
        .then(async () => {
          await router.replace(`/project`);
          successNotify(`Successfully updated project ${data.displayName}`);
        })
        .catch(() => {
          errorNotify(`Failed to create row`);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateProject, projectId]
  );
  const handleRevokeClick = useCallback(
    async (id: string) => {
      await revokeApiKey({
        variables: { input: { id, projectId: projectId as string } },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [revokeApiKey]
  );
  const handleDeleteClick = useCallback(async () => {
    await deleteProject({
      variables: {
        input: {
          id: projectId as string,
        },
      },
    });

    await router.replace(`/project`);
    successNotify(`Successfully deleted project`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProject]);
  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      // @ts-expect-error
      project: project?.project,
      collection: null,
      page: "ProjectSettings",
    });
  });

  const projectName = project ? `${project?.project.name} Settings` : "";

  return (
    <>
      <Head>
        <title>{`${projectName} | rackany`}</title>
      </Head>
      <Title title="Settings" />
      {loading ? (
        <Loading />
      ) : error ? (
        error ? (
          <Error errors={[error]} />
        ) : (
          <></>
        )
      ) : (
        <Container>
          <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
            <TabList>
              <Tab>Settings</Tab>
              <Tab>API Keys</Tab>
            </TabList>
            <TabPanel>
              <ProjectSettings
                // @ts-expect-error
                project={project?.project}
                onSubmit={onSubmit}
                onDeleteClick={handleDeleteClick}
              />
            </TabPanel>
            <TabPanel>
              <ApiKeys
                // @ts-expect-error
                project={project?.project}
                handleRevokeClick={handleRevokeClick}
              />
            </TabPanel>
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default Settings;
