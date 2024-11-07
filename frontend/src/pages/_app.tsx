import LayoutAdmin from "@/admin/components/LayoutAdmin";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { DateProvider } from "@/contexts/DateContext";
import LayoutClient from "@/user/components/layout-elements/LayoutClient";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache({ addTypename: false }),
  credentials: "include",
});

export default function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/admin")) {
    return (
      <ApolloProvider client={client}>
        <DateProvider>
          <AuthProvider>
            <LayoutAdmin>
              <Component {...pageProps} />
            </LayoutAdmin>
          </AuthProvider>
        </DateProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <DateProvider>
        <AuthProvider>
          <CartProvider>
            <LayoutClient>
              <Component {...pageProps} />
            </LayoutClient>
          </CartProvider>
        </AuthProvider>
      </DateProvider>
    </ApolloProvider>
  );
}
