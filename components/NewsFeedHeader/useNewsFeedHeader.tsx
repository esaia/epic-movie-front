import { useState } from "react";

const useNewsFeedHeader = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleClickOutside = () => {
    setShowNotification(false);
  };

  return { showNotification, handleToggleNotification, handleClickOutside };
};

export default useNewsFeedHeader;
