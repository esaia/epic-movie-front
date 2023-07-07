import Link from "next/link";
import React from "react";

interface propsType {
  title: string;
  desc: string;
  link: string;
  buttonText: string;
  icon: React.JSX.Element;
}

const NotificationModal = ({
  title,
  desc,
  link,
  icon,
  buttonText,
}: propsType) => {
  return (
    <div className="w-full h-full  m-auto flex flex-col gap-3 justify-start items-center">
      {icon}
      <h2 className="text-center text-4xl mb-2">{title}</h2>
      <p className="text-center text-sm  mb-5">{desc}</p>
      <Link href={link}>
        <button className="px-10 md:px-28 py-2 bg-red-500 text-white rounded-md w-full mt-5">
          {buttonText}
        </button>
      </Link>
      {desc ===
        "We have sent a password recover instructions to your email" && (
        <p className="text-gray-500 cursor-pointer">
          Skip, I will confirm later
        </p>
      )}
    </div>
  );
};

export default NotificationModal;
