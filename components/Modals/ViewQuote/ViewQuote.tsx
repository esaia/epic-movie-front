import { Comments, ProfilePic } from "@/components";
import { VscComment } from "react-icons/vsc";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TfiPencil } from "react-icons/tfi";
import { Quote, comment } from "global";
import useViewQuote from "./useViewQuote";
import { Dispatch, SetStateAction } from "react";

const ViewQuote = ({
  quote,
  setViewQuote,
  seteditQuote,
  deleteQuote,
}: {
  quote: Quote;
  setViewQuote?: Dispatch<SetStateAction<boolean>>;
  seteditQuote?: Dispatch<SetStateAction<boolean>>;
  deleteQuote?: () => void;
}) => {
  const { user, t, comments, handleSubmit, register, submitForm } =
    useViewQuote(quote);

  return (
    <div className="w-full text-center h-screen md:h-fit md:max-h-[90vh] ">
      <div className="absolute left-4 top-4 flex items-center gap-2">
        {setViewQuote && seteditQuote && deleteQuote && (
          <>
            <TfiPencil
              className="cursor-pointer"
              onClick={() => {
                setViewQuote(false);
                seteditQuote(true);
              }}
            />
            |
            <BsTrash3 className="cursor-pointer" onClick={deleteQuote} />
          </>
        )}
      </div>
      <h2 className="py-3 border-b border-gray-600 text-xl">
        {t("view quote")}
      </h2>

      <div className="p-5">
        <div className="flex items-center gap-2  ">
          <ProfilePic size="10" />

          <p>{user?.name}</p>
        </div>
      </div>

      <div className="m-3">
        <div className="w-full flex  relative border border-gray-600 rounded-md px-3 py-1 mb-4 ">
          <p className="absolute right-3">Eng</p>
          <p>{quote.quote.en}</p>
        </div>
        <div className="w-full flex  relative border border-gray-600 rounded-md px-3 py-1 mb-4 ">
          <p className="absolute right-3">ქარ</p>
          <p>“{quote.quote["ka"]}”</p>
        </div>

        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${quote.img}`}
          alt="profile"
          className="w-full h-72 rounded-md object-cover "
        />

        <div className="flex gap-4 border-b border-gray-700 pb-3 my-3">
          <div className="flex items-center gap-1">
            <p>{comments?.length}</p>
            <VscComment className="text-2xl" />
          </div>
          <div className="flex items-center gap-1">
            <p>10</p>
            <AiOutlineHeart className="text-2xl" />
          </div>
        </div>
        {comments &&
          comments.map((comment: comment, i: number) => {
            return (
              <Comments key={i} user={comment.user} comment={comment.comment} />
            );
          })}

        <div className="flex  gap-3 pb-4">
          <div className="w-12">
            <ProfilePic size="10" />
          </div>

          <form
            className="bg-secondary w-full flex items-center rounded-md"
            onSubmit={handleSubmit(submitForm)}
          >
            <input
              type="text"
              placeholder="Write a comment"
              {...register("comment")}
              className="w-full px-5 py-2 bg-transparent outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewQuote;
