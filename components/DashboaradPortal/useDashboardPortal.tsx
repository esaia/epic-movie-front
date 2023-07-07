import { useEffect, useLayoutEffect, useState } from "react";

interface propsType {
  isOpen: boolean;
}

const useDashboardPortal = ({ isOpen }: propsType) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.querySelector("#bodyid")!.classList.add("overflow-hidden");
    } else {
      document.querySelector("#bodyid")!.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return { isClient, setIsClient };
};

export default useDashboardPortal;
