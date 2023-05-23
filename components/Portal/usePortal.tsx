import { useEffect, useState } from "react";

const usePortal = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient, setIsClient };
};

export default usePortal;
