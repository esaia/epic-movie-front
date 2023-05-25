import { CreateQuote, DashboardWrapper, QuotePost } from "@/components";

const Home = () => {
  return (
    <DashboardWrapper gridColumn="md:grid-cols-column3">
      <CreateQuote />
      <QuotePost />
      <QuotePost />
      <QuotePost />
    </DashboardWrapper>
  );
};

export default Home;
