import { Ghost } from "@/components";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="bg-background w-full h-screen flex items-center justify-center flex-col gap-5">
      <Ghost />
      <p className="font-bold text-4xl text-white">Whoops!</p>
      <p className="text-md text-white">
        We can not see the page you are looking for
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
