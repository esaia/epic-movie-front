import { CreateQuote, NewsFeedHeader, QuotePost, Sidebar } from "@/components";

const Home = () => {
  return (
    <div className="bg-background  text-white  ">
      <NewsFeedHeader />
      <div className="pt-16"></div>

      <div className="flex  px-7  max-w-[1920px] m-auto ">
        <div className="flex-1 py-5 hidden md:block min-w-[200px] ">
          <Sidebar />
        </div>

        <div className="flex-3 py-5  max-w-[650px] text-white ">
          <CreateQuote />
          <QuotePost />
          <QuotePost />
          <QuotePost />
        </div>

        <div className="flex-1 py-5 hidden md:block"></div>
      </div>
    </div>
  );
};

export default Home;
