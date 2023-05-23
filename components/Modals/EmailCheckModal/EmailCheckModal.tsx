import { EmailCheckIcon } from "components/icons";
import React from "react";

const EmailCheckModal = () => {
  return (
    <>
      <div className="w-full h-full  m-auto flex flex-col gap-3 justify-start items-center">
        <EmailCheckIcon />
        <h2 className="text-center text-4xl mb-2">Thank you!</h2>
        <p className="text-center text-sm  mb-5">
          Please check your email and follow the instructions to activate your
          account.
        </p>
        <button className="px-5 py-2 bg-red-500 text-white rounded-md w-full mt-5">
          Go to my email
        </button>
      </div>
    </>
  );
};

export default EmailCheckModal;
