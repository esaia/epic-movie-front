import { AuthContext } from "context/AuthContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";

const useViewQuote = () => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");

  return { user, t };
};

export default useViewQuote;
