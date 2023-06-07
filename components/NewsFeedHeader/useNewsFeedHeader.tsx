import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useState } from "react";
import Cookies from "js-cookie";

const useNewsFeedHeader = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showLanguageDropDown, setShowLanguageDropDown] = useState(false);
  const { push, locale, locales, pathname } = useRouter();
  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleClickOutside = () => {
    setShowNotification(false);
    setShowLanguageDropDown(false);
  };

  const changeLanguage: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    push(pathname, undefined, {
      locale: locales?.find((localee) => localee !== locale),
    });
    setShowLanguageDropDown(false);
  };

  const logout = () => {
    Cookies.remove("user-email", { path: "" });
    localStorage.removeItem("user");
    const logout = async () => {
      await axiosAPI.get("/logout");
    };
    logout();
    push("/landing");
  };

  return {
    showNotification,
    handleToggleNotification,
    handleClickOutside,
    logout,
    showLanguageDropDown,
    setShowLanguageDropDown,
    locale,
    locales,
    pathname,
    changeLanguage,
  };
};

export default useNewsFeedHeader;
