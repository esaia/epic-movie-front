import { CreateQuote, DashboardWrapper, QuotePost } from "@/components";

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

export default Home;
