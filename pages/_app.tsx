import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { AuthProvider } from "context/AuthContext";
import { NextIntlProvider } from "next-intl";
import { useRouter } from "next/router";
import { QuoteProvider } from "@/context/QuoteContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient();
  const { locale } = useRouter();

  return getLayout(
    <NextIntlProvider messages={pageProps.messages}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <QuoteProvider>
            <Head>
              <title>Epic movie</title>
              <meta name="referrer" content="no-referrer" />
            </Head>
            <div className={locale === "ka" ? "font-Helvetica" : ""}>
              <Component {...pageProps} />
            </div>
          </QuoteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NextIntlProvider>
  );
}

export default MyApp;
