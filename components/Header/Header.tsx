import { DropDownArrow } from "@/components";
import React from "react";

const Header = () => {
  return (
    <div className="px-7 py-5 flex justify-between items-center absolute top-0 left-[50%] translate-x-[-50%] w-full max-w-[1920px] font-Helvetica  z-50">
      <h1 className="uppercase text-white">Movie quotes</h1>
      <div className="flex gap-4 ">
        <div className="hidden md:flex justify-center items-center gap-2 cursor-pointer">
          <p className="text-white">Eng</p>
          <DropDownArrow />
        </div>
        <button className="px-5 py-2 bg-red-500 text-white rounded-md">
          Sign Up
        </button>
        <button className="px-5 py-2 bg-transparent text-white rounded-md mr-5 border border-white">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Header;
