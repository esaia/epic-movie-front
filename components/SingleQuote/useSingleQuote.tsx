import { useState } from "react";

const useSingleQuote = () => {
  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsMobile, setshowDetailsMobile] = useState(false);

  return {
    showDetails,
    setshowDetails,
    showDetailsMobile,
    setshowDetailsMobile,
  };
};

export default useSingleQuote;
