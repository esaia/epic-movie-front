import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useCreateQuote = () => {
  const [isSearching, setisSearching] = useState(false);

  const [createQuoteModal, setCreateQuoteModal] = useState<boolean>(false);

  const router = useRouter();

  const closeModal = () => {
    router.push("/");
  };

  useEffect(() => {
    const { modal } = router.query;

    setCreateQuoteModal(modal === "create-quote");
  }, [router]);

  return { isSearching, setisSearching, createQuoteModal, closeModal };
};

export default useCreateQuote;
