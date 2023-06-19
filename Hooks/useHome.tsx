import { Quote } from "global";
import axiosAPI from "lib/axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useHome = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);

  const fetchQuotes = async () => {
    const { data } = await axiosAPI.get("/quotes?page=" + page);
    return data;
  };

  const { refetch: refetchQuotes, status } = useQuery(["fetchQuotes"], {
    queryFn: fetchQuotes,

    onSuccess: (data) => {
      if (data.quotes?.length === 0) return;

      const combinedArray = quotes.concat(data.quotes);
      setQuotes(combinedArray);

      setPage((prevPage) => prevPage + 1);
      setMaxPage(data.maxPage);
    },
  });

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight - window.innerHeight <=
      document.documentElement.scrollTop
    ) {
      if (page > maxPage) {
        return;
      } else {
        refetchQuotes();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, maxPage]);

  return {
    status,
    quotes,
  };
};

export default useHome;
