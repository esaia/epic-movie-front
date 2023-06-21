import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchQuotes } from "lib/index";

const useHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    refetch: refetchQuotes,
  } = useInfiniteQuery(["fetchQuotes"], {
    queryFn: ({ pageParam = 1 }) => {
      return fetchQuotes(pageParam, searchQuery);
    },
    getNextPageParam: (lastPage, pages) => {
      const totalPage = lastPage.totalpages;
      const currentPage = lastPage.currentPage;
      return currentPage === totalPage ? undefined : currentPage + 1;
    },
  });

  useEffect(() => {
    refetchQuotes();
  }, [searchQuery]);

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
    setSearchQuery,
  };
};

export default useHome;
