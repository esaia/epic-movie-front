import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { queryType } from "global";

const useCreateQuote = (setSearchQuery: Dispatch<SetStateAction<string>>) => {
  const [isSearching, setisSearching] = useState(false);
  const [createQuoteModal, setCreateQuoteModal] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("Home");

  const form = useForm<queryType>();
  const { handleSubmit, register, setFocus } = form;

  const closeModal = () => {
    router.push("/");
  };

  useEffect(() => {
    const { modal } = router.query;

    setCreateQuoteModal(modal === "create-quote");
  }, [router]);

  const openSearching = () => {
    setisSearching(true);
    setFocus("searchQuery");
  };

  const closeSearching = () => {
    setisSearching(false);
  };

  useEffect(() => {
    setFocus("searchQuery");
  }, [isSearching]);

  const onSubmit = async (query: queryType) => {
    setSearchQuery(query.searchQuery);
  };

  return {
    isSearching,
    createQuoteModal,
    closeModal,
    t,
    handleSubmit,
    onSubmit,
    register,
    openSearching,
    closeSearching,
  };
};

export default useCreateQuote;
