import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "components/shared/Title";

const Error: React.VFC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Error | rackany</title>
      </Head>
      <Title title="Error" />
    </>
  );
};

export default Error;
