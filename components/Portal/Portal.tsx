import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { PortalProps } from "./types";

const Portal = ({ children, isOpen, closeModal }: PortalProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && isOpen
    ? createPortal(
        <div
          className="bg-gray-900/30  absolute left-0 top-0 h-screen w-full flex justify-center items-center z-50 "
          onClick={closeModal}
        >
          <div className="fixed top-0 w-full h-screen backdrop-blur-[2px] "></div>

          <div
            className="md:max-w-xl w-full h-screen md:h-fit bg-[#222030] text-white  px-6 md:px-20 py-32 md:py-10 relative md:rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute right-4 top-4 cursor-pointer text-xl"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </div>

            {children}
          </div>
        </div>,
        document.querySelector("#myportal")!
      )
    : null;
};

export default Portal;
