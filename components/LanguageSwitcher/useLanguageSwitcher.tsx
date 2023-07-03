import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";

const useLanguageSwitcher = () => {
  const [showLanguageDropDown, setShowLanguageDropDown] = useState(false);
  const router = useRouter();
  const { push, locale, locales, asPath, reload } = router;

  const handleClickOutside = () => {
    setShowLanguageDropDown(false);
  };

  const changeLanguage: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    push(asPath, undefined, {
      locale: locales?.find((localee) => localee !== locale),
    });
    setShowLanguageDropDown(false);
    reload();
  };

  return {
    showLanguageDropDown,
    setShowLanguageDropDown,
    handleClickOutside,
    changeLanguage,
    locale,
    locales,
  };
};

export default useLanguageSwitcher;
