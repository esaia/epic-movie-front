import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const useCreateQuote = () => {
  const [isSearching, setisSearching] = useState(false);
  const [createQuoteModal, setCreateQuoteModal] = useState<boolean>(false);
  const router = useRouter();

  const t = useTranslations("Home");

  const closeModal = () => {
    router.push("/");
  };

  useEffect(() => {
    const { modal } = router.query;

    setCreateQuoteModal(modal === "create-quote");
  }, [router]);

  return { isSearching, setisSearching, createQuoteModal, closeModal, t };
};

export default useCreateQuote;
