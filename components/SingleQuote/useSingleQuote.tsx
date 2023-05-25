import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSingleQuote = () => {
  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsMobile, setshowDetailsMobile] = useState(false);
  const router = useRouter();

  const [viewQuote, setViewQuote] = useState<boolean>(false);
  const [editQuote, seteditQuote] = useState<boolean>(false);

  const closeShowDetails = () => {
    setshowDetails(false);
  };

  const closeModal = () => {
    router.push("/movies/id");
  };

  useEffect(() => {
    const { modal } = router.query;
    setViewQuote(modal === "view-quote");
    seteditQuote(modal === "edit-quote");
  }, [router, router.query]);

  return {
    showDetails,
    setshowDetails,
    showDetailsMobile,
    setshowDetailsMobile,
    viewQuote,
    editQuote,
    closeModal,
    closeShowDetails,
  };
};

export default useSingleQuote;
