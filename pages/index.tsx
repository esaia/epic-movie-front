import { CreateQuote, DashboardWrapper, QuotePost } from "@/components";
import { GetStaticPropsContext } from "next";

const Home = () => {
  return (
    <DashboardWrapper>
      <CreateQuote />
      <QuotePost />
      <QuotePost />
      <QuotePost />
    </DashboardWrapper>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../locales/${context.locale}/common.json`))
        .default,
    },
  };
}

export default Home;
