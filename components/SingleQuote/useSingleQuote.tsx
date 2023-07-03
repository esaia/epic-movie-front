import { Quote } from "global";
import { deleteQuoteRequest } from "lib/index";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";

const useSingleQuote = (quote: Quote) => {
  const { locale, query } = useRouter();
  const t = useTranslations("SingleMovie");
  const queryClient = useQueryClient();

  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsMobile, setshowDetailsMobile] = useState(false);
  const [viewQuote, setViewQuote] = useState<boolean>(false);
  const [editQuote, seteditQuote] = useState<boolean>(false);
  const [deleteConfirmation, setdeleteConfirmation] = useState<boolean>(false);

  const closeShowDetails = () => {
    setshowDetails(false);
    setshowDetailsMobile(false);
  };

  const closeModal = () => {
    setViewQuote(false);
    seteditQuote(false);
    setdeleteConfirmation(false);
  };

  const deleteQuote = async () => {
    setdeleteConfirmation(true);
  };

  const deleteQuoteFromDb = async () => {
    await deleteQuoteRequest(quote.id);

    queryClient.invalidateQueries(["singleMovie", query.id]);
  };

  return {
    showDetails,
    setshowDetails,
    showDetailsMobile,
    setshowDetailsMobile,
    viewQuote,
    editQuote,
    closeModal,
    closeShowDetails,
    locale,
    setViewQuote,
    seteditQuote,
    deleteQuote,
    deleteConfirmation,
    deleteQuoteFromDb,
    t,
  };
};

export default useSingleQuote;
