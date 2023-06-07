import { Notification } from "@/components";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";
import { RiArrowUpSFill } from "react-icons/ri";
import useNewsFeedHeader from "./useNewsFeedHeader";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import { MouseEvent } from "react";

const NewsFeedHeader = () => {
  const {
    showNotification,
    handleToggleNotification,
    handleClickOutside,
    logout,
    showLanguageDropDown,
    setShowLanguageDropDown,
    locale,
    locales,
    changeLanguage,
  } = useNewsFeedHeader();

  return (
    <div className=" max-w-[1920px] left-[50%] translate-x-[-50%] h-16 bg-secondary  py-3 md:px-7 md:py-5 flex justify-between items-center w-full  font-Helvetica  fixed top-0 z-[20]">
      <h1 className="uppercase text-white hidden md:block">Movie quotes</h1>
      <CiMenuBurger className="md:hidden block text-2xl ml-7 cursor-pointer" />
      <div className="flex gap-4 items-center ">
        <div
          className="relative cursor-pointer "
          onClick={handleToggleNotification}
        >
          <div className="bg-red-600 rounded-full w-4 h-4 absolute right-0 text-white flex justify-center items-center text-sm">
            1
          </div>
          <IoMdNotificationsOutline className="text-3xl text-white" />

          {showNotification && (
            <OutsideClickHandler onOutsideClick={handleClickOutside}>
              <div className=" hidden md:block md:absolute max-w-xl w-[800px] select-none min-h-fit absolute top-10 right-[-150px] bg-black rounded-md p-3 ">
                <RiArrowUpSFill className="absolute top-[-14px] right-[152px] text-black text-2xl " />

                <div className="mb-5 ">
                  <div className="flex justify-between items-center">
                    <p className="text-xl">Notifications</p>
                    <p className="underline text-sm">Mark as all read</p>
                  </div>
                </div>

                <Notification />
              </div>
            </OutsideClickHandler>
          )}
        </div>

        {showNotification && (
          <div className="absolute  top-16 left-0  min-h-fit w-full select-none  bg-black p-4   md:hidden">
            <RiArrowUpSFill className=" absolute top-[-17px] right-[72px] text-black text-3xl " />
            <div className=" mb-5 ">
              <div className="flex justify-between items-center  ">
                <p className="text-xl">Notifications</p>
                <p className="underline text-sm">Mark as all read</p>
              </div>
            </div>
            <Notification />
          </div>
        )}

        <div
          className="hidden md:flex justify-center items-center gap-2 cursor-pointer relative "
          onClick={() => setShowLanguageDropDown(true)}
        >
          <p className="text-white"> {locale}</p>
          <AiOutlineCaretDown className="text-white " />

          {showLanguageDropDown && (
            <div className="absolute px-6 py-1 top-8 left-[50%] translate-x-[-50%] bg-gray-800 rounded-md">
              <OutsideClickHandler onOutsideClick={handleClickOutside}>
                <p onClick={(e) => changeLanguage(e)}>
                  {locales?.find((localee) => localee !== locale)}
                </p>
              </OutsideClickHandler>
            </div>
          )}
        </div>

        <BiSearch className="md:hidden block text-2xl" />

        <button
          className="px-5 py-2 text-sm bg-transparent text-white rounded-md border border-white md:block hidden"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default NewsFeedHeader;
