import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { RetryLink } from "@apollo/client/link/retry";
import { useAuthDispatch } from "lib/context/AuthContext";
import ApolloLinkTimeout from "apollo-link-timeout";

export const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const [token, setToken] = React.useState<string>("");
  const setAuth = useAuthDispatch();
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const timeoutLink = new ApolloLinkTimeout(10000);
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  });
  const retryLink = new RetryLink();
  const withTokenLink = setContext(async () => {
    if (token) {
      return { auth0Token: token };
    }

    const idToken = isAuthenticated ? await getIdTokenClaims() : "";
    if (!idToken) return { auth0Token: null };
    setToken(idToken.__raw);
    setAuth(idToken.__raw);
    return { auth0Token: idToken.__raw };
  });

  const authLink = setContext((_, { headers, auth0Token }) => {
    if (!auth0Token) {
      throw new Error("not authenticated");
    }

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${auth0Token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: retryLink
      .concat(timeoutLink)
      .concat(withTokenLink)
      .concat(authLink)
      .concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== "production",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
