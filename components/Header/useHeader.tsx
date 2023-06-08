import { useTranslations } from "next-intl";

const useHeader = () => {
  const t = useTranslations("Header");

  return { t };
};

export default useHeader;
