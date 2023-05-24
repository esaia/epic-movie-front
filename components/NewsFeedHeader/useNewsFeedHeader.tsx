import { useState } from "react";

const useNewsFeedHeader = () => {
  const [showNotification, setShowNotification] = useState(false);

  return { showNotification, setShowNotification };
};

export default useNewsFeedHeader;
