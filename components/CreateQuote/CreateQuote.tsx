import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import useCreateQuote from "./useCreateQuote";
import { CreateQuoteModal, DashboaradPortal } from "@/components";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

const CreateQuote = ({
  setSearchQuery,
}: {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
  const {
    isSearching,
    createQuoteModal,
    closeModal,
    t,
    handleSubmit,
    onSubmit,
    openSearching,
    register,
    closeSearching,
  } = useCreateQuote(setSearchQuery);

  return (
    <div className="flex w-full gap-3">
      <div className="flex w-full flex-3 items-center gap-3 bg-secondary px-3 py-2 cursor-pointer rounded-md">
        <HiOutlinePencilSquare />
        <Link href={"/?modal=create-quote"}>
          <p>{t("Write new quote")}</p>
        </Link>
      </div>

      <DashboaradPortal isOpen={createQuoteModal} closeModal={closeModal}>
        <CreateQuoteModal />
      </DashboaradPortal>

      <div
        className={`hidden md:flex  items-center  ${
          isSearching && "w-7/12 border-b border-gray-500"
        } `}
      >
        <div
          className="w-full  items-center gap-2 text-gray-200  "
          onClick={openSearching}
        >
          {!isSearching && (
            <div className="flex items-center gap-2 justify-center w-28">
              <BiSearch className="text-xl" />
              <p>{t("Search by")} </p>
            </div>
          )}

          {isSearching && (
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full  items-center gap-1 flex"
              >
                <BiSearch className="text-xl" />

                <input
                  type="text"
                  placeholder={t("add quote placeholder")}
                  className="w-full outline-none px-2 bg-transparent text-sm"
                  {...register("searchQuery")}
                />
              </form>
            </div>
          )}
        </div>

        {isSearching && (
          <div onClick={closeSearching}>
            <AiOutlineCloseCircle className="cursor-pointer text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuote;
