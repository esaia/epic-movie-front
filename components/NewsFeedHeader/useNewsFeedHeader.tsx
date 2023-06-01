import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";

const useNewsFeedHeader = () => {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleClickOutside = () => {
    setShowNotification(false);
  };

  const logout = () => {
    const logout = async () => {
      await axiosAPI.post("/logout");
    };
    logout();
    router.push("/landing");
  };

  return {
    showNotification,
    handleToggleNotification,
    handleClickOutside,
    logout,
  };
};

export default useNewsFeedHeader;