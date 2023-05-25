import { VscComment } from "react-icons/vsc";
import { BsThreeDots, BsTrash3 } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { RiPencilLine } from "react-icons/ri";
import { useState } from "react";

const SingleQuote = () => {
  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsMobile, setshowDetailsMobile] = useState(false);

  return (
    <div className="bg-[#11101a] p-4 rounded-md relative mb-5 ">
      <div
        className="absolute top-3 right-3 cursor-pointer hidden md:block"
        onClick={() => setshowDetails(!showDetails)}
      >
        <BsThreeDots />
      </div>

      {showDetails && (
        <div className="absolute top-8 right-[-40px] bg-secondary rounded-md p-5 hidden md:block">
          <div className="flex gap-3 mb-2 cursor-pointer items-center">
            <AiOutlineEye />
            <p>view quote</p>
          </div>

          <div className="flex gap-3 mb-2 cursor-pointer items-center">
            <RiPencilLine />
            <p>Edit </p>
          </div>

          <div className="flex gap-3 mb-2 cursor-pointer items-center">
            <BsTrash3 />
            <p>Delete </p>
          </div>
        </div>
      )}

      {showDetailsMobile && (
        <div className="absolute bottom-14 right-3 bg-secondary rounded-md p-5 block md:hidden">
          <div className="flex gap-3 mb-2 cursor-pointer items-center">
            <AiOutlineEye />
            <p>view quote</p>
          </div>

          <div className="flex gap-3 mb-2 cursor-pointer items-center">
            <RiPencilLine />
            <p>Edit </p>
          </div>

          <div className="flex gap-3 mb-2 cursor-pointer items-center">
            <BsTrash3 />
            <p>Delete </p>
          </div>
        </div>
      )}

      <div className="flex items-center md:flex-row flex-col gap-6 border-b border-gray-600 pb-5 select-none">
        <img
          src="https://media.istockphoto.com/id/1237804526/vector/movie-night-concept-with-popcorn-cinema-tickets-drink-tape-in-cartoon-style-movie-or-cinema.jpg?s=612x612&w=0&k=20&c=FWIp6SXBqUg-_PWtoTxOy00b2aeg5xNDiRcFr6IF4l4="
          alt=""
          className="rounded-sm object-cover md:w-36 w-full h-full "
        />
        <p>"Frankly, my dear, I don'tgive a damn."</p>
      </div>

      <div className="flex justify-between  mt-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <p>3</p>
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
