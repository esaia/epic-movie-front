import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import { AuthProvider } from "context/AuthContext";
import { NextIntlProvider, IntlErrorCode } from "next-intl";
import { useRouter } from "next/router";

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
          <Head>
            <title>Epic movie</title>
          </Head>
          <div className={locale === "ka" ? "font-Helvetica" : ""}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </NextIntlProvider>
  );
}

export default MyApp;
