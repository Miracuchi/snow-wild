import "@/styles/globals.css";
import { useContext } from "react";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LayoutClient from "@/components/layout-elements/LayoutClient";
import Head from "next/head";
import { AuthProvider, AuthContext } from "@/contexts/authContext";
import LayoutAdmin from "@/admin/components/LayoutAdmin";
import Cookies from "js-cookie";


const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({ addTypename: false }),
  credentials: "include"
  // defaultOptions: {
  // watchQuery: { fetchPolicy: "no-cache", nextFetchPolicy: "no-cache" },
  // },
});

export default function App({ Component, pageProps, router }: AppProps) {

  if(router.pathname.startsWith('/admin')) {
    return (
      <ApolloProvider client={client}>
        <AuthProvider>
          <LayoutAdmin>
            <Component {...pageProps} />
          </LayoutAdmin>
        </AuthProvider>
      </ApolloProvider>
    )
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <LayoutClient>
          <Component {...pageProps} />
        </LayoutClient>
      </AuthProvider>
    </ApolloProvider>
  )
}
