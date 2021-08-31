import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/shared/Layout";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthorizedApolloProvider } from "lib/authorized-apollo-client";
import { ModalProvider } from "react-modal-hook";
import { ToastContainer } from "react-toastify";
import NextNprogress from "nextjs-progressbar";
import "styles/globals.css";
import "swagger-ui-react/swagger-ui.css";
import "react-toastify/dist/ReactToastify.min.css";
import "styles/tabs.css";
import ContextProvider from "lib/context";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URL}
      >
        <ContextProvider>
          <AuthorizedApolloProvider>
            <ModalProvider>
              <NextNprogress
                color="#33884d"
                startPosition={0.3}
                stopDelayMs={400}
                height={3}
              />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ModalProvider>
          </AuthorizedApolloProvider>
        </ContextProvider>
        <ToastContainer theme="dark" />
      </Auth0Provider>
    </>
  );
};

export default MyApp;
