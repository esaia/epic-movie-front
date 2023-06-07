import React from "react";
import { BsChatQuote } from "react-icons/bs";

interface moviePostProps {
  title: string;
  img: string;
}

const MoviePost = ({ title, img }: moviePostProps) => {
  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${img}`}
        alt=""
        className="rounded-md aspect-square w-full md:h-56 xl:h-80 object-cover"
      />
      <p className="py-2 text-xl">{title} (2021) </p>
      <div className="flex items-center gap-2 text-xl">
        <div>10</div>
        <BsChatQuote />
      </div>
    </div>
  );
};

export default MoviePost;
