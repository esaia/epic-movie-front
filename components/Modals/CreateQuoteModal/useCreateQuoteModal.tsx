import { useTranslations } from "next-intl";

const useCreateQuoteModal = () => {
  const t = useTranslations("Home");

  return { t };
};

export default useCreateQuoteModal;
