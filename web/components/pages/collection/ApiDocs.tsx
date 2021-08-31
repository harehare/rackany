import { useApiDocs } from "hooks/useApiDocs";
import { useRouter } from "next/router";
import React from "react";
import Error from "components/shared/Error";
import Loading from "components/shared/Loading";
import SwaggerUI from "swagger-ui-react";

const ApiDocs: React.VFC = () => {
  const router = useRouter();
  const { projectId, collectionId } = router.query;
  const [spec, error] = useApiDocs({
    projectId: projectId as string,
    collectionId: collectionId as string,
  });

  if (error) return <Error errors={[error]} />;
  if (!spec) return <Loading />;

  return (
    <>
      <SwaggerUI spec={spec} />
    </>
  );
};

export default ApiDocs;
