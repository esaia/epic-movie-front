import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const useNewsFeedHeader = () => {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const t = useTranslations("Notifications");

  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleClickOutside = () => {
    setShowNotification(false);
  };

  const logout = () => {
    Cookies.remove("user-email", { path: "" });
    localStorage.removeItem("user");
    const logout = async () => {
      await axiosAPI.get("/logout");
    };
    logout();
    router.push("/landing");
  };

  return {
    showNotification,
    handleToggleNotification,
    logout,
    handleClickOutside,
    t,
  };
};

export default useNewsFeedHeader;
