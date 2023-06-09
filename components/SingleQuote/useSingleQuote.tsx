import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSingleQuote = () => {
  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsMobile, setshowDetailsMobile] = useState(false);
  const { locale, query, push } = useRouter();
  const t = useTranslations("SingleMovie");

  const [viewQuote, setViewQuote] = useState<boolean>(false);
  const [editQuote, seteditQuote] = useState<boolean>(false);

  const closeShowDetails = () => {
    setshowDetails(false);
  };

  const closeModal = () => {
    push("/movies/id");
  };

  useEffect(() => {
    const { modal } = query;
    setViewQuote(modal === "view-quote");
    seteditQuote(modal === "edit-quote");
  }, [query]);

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
    t,
  };
};

export default useSingleQuote;
