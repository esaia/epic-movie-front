import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

const useSingleQuote = () => {
  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsMobile, setshowDetailsMobile] = useState(false);
  const { locale } = useRouter();
  const t = useTranslations("SingleMovie");

  const [viewQuote, setViewQuote] = useState<boolean>(false);
  const [editQuote, seteditQuote] = useState<boolean>(false);

  const closeShowDetails = () => {
    setshowDetails(false);
  };

  const closeModal = () => {
    setViewQuote(false);
    seteditQuote(false);
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
    t,
  };
};

export default useSingleQuote;
