import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchQuotes, getUser } from "lib/index";
import Cookies from "js-cookie";
import { useQuote } from "@/context/QuoteContext";
import { useTranslations } from "next-intl";

const useHome = () => {
  const { searchQuery, setSearchQuery } = useQuote();
  const t = useTranslations("Home");

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

  useEffect(() => {
    const getUserFromDb = async () => {
      const { data } = await getUser();
      Cookies.set("user-email", data.user.email, { expires: 600 });
      localStorage.setItem("user", JSON.stringify(data.user));
    };
    getUserFromDb();
  }, []);

  return {
    quotes: data,
    hasNextPage,
    status,
    setSearchQuery,
    t,
  };
};

export default useHome;
