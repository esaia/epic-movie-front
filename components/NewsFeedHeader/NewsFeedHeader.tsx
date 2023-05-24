import Link from "next/link";
import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";

const NewsFeedHeader = () => {
  return (
    <div className=" max-w-[1920px] left-[50%] translate-x-[-50%] h-16 bg-secondary px-4 py-3 md:px-7 md:py-5 flex justify-between items-center w-full  font-Helvetica  z-40 fixed top-0">
      <h1 className="uppercase text-white hidden md:block">Movie quotes</h1>
      <CiMenuBurger className="md:hidden block text-2xl" />
      <div className="flex gap-4 items-center ">
        <div className="relative cursor-pointer">
          <div className="bg-red-600 rounded-full w-4 h-4 absolute right-0 text-white flex justify-center items-center text-sm">
            1
          </div>
          <IoMdNotificationsOutline className="text-3xl text-white" />
        </div>

        <div className="hidden md:flex justify-center items-center gap-2 cursor-pointer ">
          <p className="text-white">Eng</p>
          <AiOutlineCaretDown className="text-white" />
        </div>

        <BiSearch className="md:hidden block text-2xl" />

        <Link href={"/landing?modal=login"}>
          <button className="px-5 py-2 text-sm bg-transparent text-white rounded-md mr-5 border border-white md:block hidden">
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsFeedHeader;
