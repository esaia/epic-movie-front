import { Quote } from "global";
import axiosAPI from "lib/axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useHome = (initialQuotes: Quote[]) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);

  const fetchQuotes = async () => {
    const { data } = await axiosAPI.get("/quotes?page=" + page);
    return data;
  };

  const { refetch, status } = useQuery({
    queryFn: fetchQuotes,

    onSuccess: (data) => {
      if (data.quotes.length === 0) return;

      const combinedArray = quotes.concat(data.quotes);
      setQuotes(combinedArray);
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
        refetch();
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, maxPage]);

  const mappedQuotes = quotes.length > 0 ? quotes : initialQuotes;
  return {
    mappedQuotes,
    status,
    quotes,
  };
};

export default useHome;
