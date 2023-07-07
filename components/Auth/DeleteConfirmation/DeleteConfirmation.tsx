import { useTranslations } from "next-intl";
import React from "react";

const DeleteConfirmation = ({
  closeModal,
  deleteFromDB,
}: {
  closeModal: () => void;
  deleteFromDB: () => void;
}) => {
  const t = useTranslations("SingleMovie");

  return (
    <div className="w-full py-20">
      <p className="text-center font-bold text-xl">
        {t("are you sure you want to delete")}
      </p>

      <div className="flex justify-center items-center gap-10 pt-10">
        <button onClick={closeModal}>{t("cancel")}</button>
        <button
          className="bg-red-600 px-4 py-2 rounded-md"
          onClick={deleteFromDB}
        >
          {t("delete")}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
