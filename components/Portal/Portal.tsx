import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { PortalProps } from "./types";
import usePortal from "./usePortal";

const Portal = ({ children, isOpen, closeModal }: PortalProps) => {
  const { isClient } = usePortal(isOpen);

  return isClient && isOpen
    ? createPortal(
        <div
          className="bg-gray-900/30  absolute left-0 top-0 md:h-screen h-full w-full flex justify-center items-center z-50  "
          onClick={closeModal}
        >
          <div className="fixed top-0 w-full h-screen backdrop-blur-[2px] "></div>

          <div
            className="md:max-w-xl md:max-h-[90vh] h-full md:h-fit text-white  w-full bg-[#222030]  relative md:rounded-md p-10 md:px-14 md:py-12  overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute text-white right-4 top-4 cursor-pointer text-xl"
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
