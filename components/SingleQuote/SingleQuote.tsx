import { VscComment } from "react-icons/vsc";
import { BsThreeDots, BsTrash3 } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { RiPencilLine } from "react-icons/ri";
import useSingleQuote from "./useSingleQuote";
import { DashboaradPortal, EditQuote, ViewQuote } from "@/components";
import OutsideClickHandler from "react-outside-click-handler";
import { Quote } from "global";

const SingleQuote = ({ quote }: { quote: Quote }) => {
  const {
    showDetails,
    setshowDetails,
    showDetailsMobile,
    setshowDetailsMobile,
    viewQuote,
    editQuote,
    closeModal,
    closeShowDetails,
    locale,
    setViewQuote,
    seteditQuote,
    t,
    deleteQuote,
  } = useSingleQuote(quote);

  return (
    <div className="bg-[#11101a] p-4 rounded-md relative mb-5  z-4">
      <DashboaradPortal isOpen={viewQuote} closeModal={closeModal}>
        <ViewQuote
          quote={quote}
          setViewQuote={setViewQuote}
          seteditQuote={seteditQuote}
          deleteQuote={deleteQuote}
        />
      </DashboaradPortal>

      <DashboaradPortal isOpen={editQuote} closeModal={closeModal}>
        <EditQuote
          quote={quote}
          closeModal={closeModal}
          deleteQuote={deleteQuote}
        />
      </DashboaradPortal>

      <div
        className="absolute top-3 right-3 cursor-pointer hidden md:block"
        onClick={() => setshowDetails(!showDetails)}
      >
        <BsThreeDots />
      </div>

      {showDetails && (
        <OutsideClickHandler onOutsideClick={closeShowDetails}>
          <div className="absolute top-9 right-[-3rem] bg-secondary rounded-md p-5 hidden md:block">
            <div
              className="flex gap-3 mb-2 cursor-pointer items-center"
              onClick={() => setViewQuote(true)}
            >
              <AiOutlineEye />
              <p>{t("view quote")}</p>
            </div>

            <div
              className="flex gap-3 mb-2 cursor-pointer items-center"
              onClick={() => seteditQuote(true)}
            >
              <RiPencilLine />
              <p>{t("Edit")}</p>
            </div>

            <div
              className="flex gap-3 mb-2 cursor-pointer items-center"
              onClick={deleteQuote}
            >
              <BsTrash3 />
              <p>{t("Delete")}</p>
            </div>
          </div>
        </OutsideClickHandler>
      )}

      {showDetailsMobile && (
        <OutsideClickHandler onOutsideClick={closeShowDetails}>
          <div className="absolute bottom-14 right-3 bg-secondary rounded-md p-5 block md:hidden">
            <div
              className="flex gap-3 mb-2 cursor-pointer items-center"
              onClick={() => setViewQuote(true)}
            >
              <AiOutlineEye />
              <p>{t("view quote")}</p>
            </div>

            <div
              className="flex gap-3 mb-2 cursor-pointer items-center"
              onClick={() => seteditQuote(true)}
            >
              <RiPencilLine />
              <p>{t("Edit")}</p>
            </div>

            <div
              className="flex gap-3 mb-2 cursor-pointer items-center"
              onClick={deleteQuote}
            >
              <BsTrash3 />
              <p>{t("Delete")}</p>
            </div>
          </div>
        </OutsideClickHandler>
      )}

      <div className="flex items-center md:flex-row flex-col gap-6 border-b border-gray-600 pb-5 select-none">
        <div className="w-full h-48 md:h-24 md:w-60">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${quote.img}`}
            className="rounded-sm object-cover w-full h-full "
          />
        </div>
        <p className="w-full">{quote.quote[`${locale}`]}</p>
      </div>

      <div className="flex justify-between  mt-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <p>{quote.comment?.length}</p>
            <VscComment className="text-2xl" />
          </div>
          <div className="flex items-center gap-1">
            <p>10</p>
            <AiOutlineHeart className="text-2xl" />
          </div>
        </div>

        <div
          onClick={() => setshowDetailsMobile(!showDetailsMobile)}
          className="cursor-pointer block md:hidden"
        >
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
};

export default SingleQuote;
