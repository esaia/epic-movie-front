import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";

const UpdateUserConfirmation = ({
  setShowConfirmationModal,
}: {
  setShowConfirmationModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Profile");

  return (
    <div>
      <div className="absolute top-0 z-20 w-full h-screen bg-black/30"></div>
      <div className="absolute flex flex-col justify-between items-center  rounded-md  z-20  w-9/12 top-40 left-[50%] translate-x-[-50%] h-60 bg-gradient-to-l from-[#262531] via-[#23222f] to-[#1b1a27]">
        <span></span>
        <h1>{t("Are you sure to make changes")}</h1>

        <div className="w-full border-t border-gray-500">
          <div className="flex justify-between items-center px-4 py-3">
            <div
              className="cursor-pointer"
              onClick={() => setShowConfirmationModal(false)}
            >
              {t("cancel")}
            </div>
            <button
              type="submit"
              className="bg-red-500 w-40 px-4 py-2 rounded-md"
            >
              {t("Edit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserConfirmation;
