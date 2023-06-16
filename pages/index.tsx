import { CreateQuote, DashboardWrapper, QuotePost } from "@/components";
import axios from "axios";
import { Quote } from "global";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies } from "nookies";
import useHome from "../Hooks/useHome";

const Home = ({ initialQuotes }: { initialQuotes: Quote[] }) => {
  const { mappedQuotes, status, quotes } = useHome(initialQuotes);

  return (
    <DashboardWrapper>
      <CreateQuote />

      {quotes.map((quotePost: Quote, i) => {
        return <QuotePost key={i} quote={quotePost} />;
      })}

      {status === "loading" && <p className="mt-5">Loading...</p>}
    </DashboardWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req } = context;

    const cookies = parseCookies({ req });
    const cookiesString = Object.keys(cookies)
      .map((key) => `${key}=${cookies[key]}`)
      .join("; ");

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL_API + "/quotes?page=1",
      {
        headers: {
          Cookie: cookiesString,
        },
      }
    );
    return {
      props: {
        initialQuotes: data,
        messages: (await import(`../locales/${context.locale}/common.json`))
          .default,
      },
    };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      destroyCookie(context, "user-email");

      return {
        redirect: {
          destination: "/landing",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
export default Home;
