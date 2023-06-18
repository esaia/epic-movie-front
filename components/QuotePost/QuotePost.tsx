import React from "react";
import { VscComment } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { Comments, ProfilePic } from "@/components";
import { Quote, comment } from "global";
import useQuotePost from "./useQuotePost";

const QuotePost = ({ quote }: { quote: Quote }) => {
  const { locale, register, handleSubmit, submitForm, comments } =
    useQuotePost(quote);

  return (
    <div className="mt-5 bg-[#11101a] p-4 rounded-md">
      <div className="flex mb-6">
        <div className="flex items-center gap-4 ">
          <img
            src={
              quote.user?.google_id
                ? quote.user?.img
                : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${quote.user?.img}`
            }
            alt="profile"
            referrerPolicy="no-referrer"
            className="aspect-square w-12 object-cover rounded-full "
          />
          <div>
            <h2 className="text-md ">{quote.user.name}</h2>
          </div>
        </div>
      </div>

      {quote.quote ? (
        <p>
          “{quote.quote[`${locale}`]}” movie -
          <span className="text-orange-200">
            {" "}
            {quote.movie.title[`${locale}`]}
          </span>{" "}
          ({quote.movie.date.slice(0, 4)})
        </p>
      ) : (
        <p>quote not found</p>
      )}

      <img
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${quote.img}`}
        alt=""
        className="w-full h-[400px] object-cover rounded-md my-6"
      />

      <div className="flex gap-4 border-b border-gray-700 pb-3 mb-3">
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

      <div className="flex  gap-3">
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
  );
};

export default QuotePost;
