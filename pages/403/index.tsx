import { Gandolf } from "components/icons";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="bg-background w-full h-screen flex items-center justify-center flex-col gap-5">
      <Gandolf />
      <p className="font-bold text-4xl text-white">You shall not pass!</p>
      <p className="text-md text-white">
        Sorry, but you don’t have permission to access this page
      </p>
      <Link href={"/"}>
        <button className="bg-red-600 py-1 px-3 rounded-md text-white">
          Return home
        </button>
      </Link>
    </div>
  );
};

export default notFound;
