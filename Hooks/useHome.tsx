import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchQuotes } from "lib/index";

const useHome = () => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["fetchQuotes"],
    {
      queryFn: fetchQuotes,
      getNextPageParam: (lastPage, pages) => {
        const totalPage = lastPage.totalpages;
        const currentPage = lastPage.currentPage;
        return currentPage > totalPage ? undefined : currentPage + 1;
      },
    }
  );

  const handleScroll = () => {
    if (hasNextPage === false) {
      window.removeEventListener("scroll", handleScroll);
      return;
    }

    if (
      Math.round(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);

  return {
    quotes: data,
    hasNextPage,
    status,
  };
};

export default useHome;
