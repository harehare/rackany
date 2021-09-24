import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Title from "components/shared/Title";
import Collection from "components/pages/collection/Collection";
import DataRows from "components/pages/rack/RackRows";
import Loading from "components/shared/Loading";
import Error from "components/shared/Error";
import { useCallback } from "react";
import {
  RackField,
  RackRowOrder,
  RackRowFilter,
  useRackRowsLazyQuery,
  useCollectionQuery,
} from "lib/generated/client";
import { usePageDispatch } from "lib/context/PageContext";
import { useEffect } from "react";
import ApiDocs from "components/pages/collection/ApiDocs";
import { useSaveFieldMutation } from "lib/generated/client";
import { toError } from "graphql/error/error";
import { errorNotify, successNotify } from "lib/notify";
import { Order, toRackRowOrder } from "lib/types/order";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
`;

const Index: React.VFC = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();
  const { projectId, collectionId, page } = router.query;
  const pageNo =
    page && !isNaN(parseInt(page as string)) ? parseInt(page as string) : 1;
  const pageSize = 30;
  const { error, loading, data } = useCollectionQuery({
    variables: {
      id: collectionId as string,
      projectId: projectId as string,
    },
  });
  const [
    loadRackRows,
    { loading: lazyRowsLoading, error: lazyRowsError, data: lazyRackRows },
  ] = useRackRowsLazyQuery();

  const [saveField] = useSaveFieldMutation();
  const handleSaveChanges = useCallback(
    async (input: RackField[]) => {
      await saveField({
        variables: {
          projectId: projectId as string,
          collectionId: collectionId as string,
          input: input.map((f, i) => ({
            id: f.id,
            name: f.name,
            displayName: f.displayName,
            description: f.description,
            fieldType: f.fieldType,
            order: i + 1,
            sortable: f.sortable,
            stored: f.stored,
            requiredField: f.requiredField,
          })),
        },
      })
        .then(async () => {
          successNotify(t("message_successfully_updated_fields"));
          await router.replace(
            `/project/${projectId as string}/collection/${
              collectionId as string
            }`
          );
        })
        .catch(() => {
          errorNotify(t("message_failed_updated_fields"));
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saveField]
  );

  const handleFetch = useCallback(
    (page: number, orders: Order[], filters: RackRowFilter[]) => {
      const rowOrders: RackRowOrder[] = toRackRowOrder(orders);

      if (!lazyRowsLoading) {
        loadRackRows({
          variables: {
            projectId: projectId as string,
            collectionId: collectionId as string,
            offset: 30 * (page - 1),
            limit: 30 * page,
            filters,
            orders: rowOrders,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectId, collectionId, lazyRowsLoading, loadRackRows]
  );

  const handlePage = useCallback(
    (pageNumber: number) => {
      router.push(
        `/project/${projectId as string}/collection/${
          collectionId as string
        }?page=${pageNumber}`
      );
    },
    [projectId, collectionId, router]
  );

  const setPage = usePageDispatch();

  useEffect(() => {
    setPage({
      // @ts-expect-error
      project: data?.project,
      collection: data?.collection,
      page: "Collection",
    });
  });

  const collectionName = data ? `${data.collection.name}` : "";

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{`${collectionName} | rackany`}</title>
      </Head>
      <Title title={collectionName} />
      {loading ? (
        <Loading />
      ) : error || lazyRowsError ? (
        <Error errors={(error || lazyRowsError).graphQLErrors.map(toError)} />
      ) : (
        <Container>
          <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
            <TabList>
              <Tab>List</Tab>
              <Tab>Fields</Tab>
              <Tab>Document</Tab>
            </TabList>
            <TabPanel>
              <DataRows
                projectId={projectId as string}
                collectionId={collectionId as string}
                rackFields={data?.collection.rackFields}
                collection={data?.collection}
                rackRows={lazyRackRows ? lazyRackRows.rackRows : []}
                pageSize={pageSize}
                currentPage={pageNo}
                loading={lazyRowsLoading}
                pageCount={
                  Math.floor(lazyRackRows?.total / pageSize) > 0
                    ? Math.floor(lazyRackRows?.total / pageSize)
                    : 1
                }
                handleFetch={handleFetch}
                handlePage={handlePage}
              ></DataRows>
            </TabPanel>
            <TabPanel>
              <Collection
                projectId={projectId as string}
                baseCollection={data?.collection}
                handleSaveChanges={handleSaveChanges}
              />
            </TabPanel>
            <TabPanel>
              <ApiDocs />
            </TabPanel>
          </Tabs>
        </Container>
      )}
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

export default Index;
