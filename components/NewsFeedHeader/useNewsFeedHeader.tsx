import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { AuthContext } from "context/AuthContext";

const useNewsFeedHeader = () => {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const { asPath } = router;
  const { user } = useContext(AuthContext);
  const t = useTranslations("Notifications");
  const [showMobileMenu, setshowMobileMenu] = useState(false);

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
    router.reload();
  };

  return {
    showNotification,
    handleToggleNotification,
    logout,
    handleClickOutside,
    t,
    user,
    router,
    showMobileMenu,
    setshowMobileMenu,
    asPath,
  };
};

export default useNewsFeedHeader;
