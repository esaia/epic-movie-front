import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import useDashboardPortal from "./useDashboardPortal";

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const DashboaradPortal = ({ children, isOpen, closeModal }: PortalProps) => {
  const { isClient } = useDashboardPortal({ isOpen });

  return isClient && isOpen
    ? createPortal(
        <div
          className="bg-gray-900/30  absolute  left-0 top-0  w-full h-screen  flex justify-center items-center  z-[100] "
          onClick={closeModal}
        >
          <div className="fixed top-0 w-full h-full backdrop-blur-[2px]  "></div>

          <div
            className="md:max-w-xl w-full md:h-fit bg-[#11101a] text-white  relative  rounded-md  overflow-y-auto  "
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute right-4 top-4 cursor-pointer text-xl  "
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

export default DashboaradPortal;
