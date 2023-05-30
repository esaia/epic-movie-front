import React from "react";
import { VscComment } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { Comments } from "@/components";

const QuotePost = () => {
  return (
    <div className="mt-5 bg-[#11101a] p-4 rounded-md">
      <div className="flex mb-6">
        <div className="flex items-center gap-4 ">
          <img
            src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
            alt="profile"
            className="aspect-square w-12 object-cover rounded-full "
          />
          <div>
            <h2 className="text-md ">Nino Tabagari</h2>
          </div>
        </div>
      </div>

      <p>“Follow your dream.”movie- Billy Elliot. (2000)</p>

      <img
        src="https://media.istockphoto.com/id/1237804526/vector/movie-night-concept-with-popcorn-cinema-tickets-drink-tape-in-cartoon-style-movie-or-cinema.jpg?s=612x612&w=0&k=20&c=FWIp6SXBqUg-_PWtoTxOy00b2aeg5xNDiRcFr6IF4l4="
        alt=""
        className="w-full h-[400px] object-cover rounded-md my-6"
      />

      <div className="flex gap-4 border-b border-gray-700 pb-3 mb-3">
        <div className="flex items-center gap-1">
          <p>3</p>
          <VscComment className="text-2xl" />
        </div>
        <div className="flex items-center gap-1">
          <p>10</p>
          <AiOutlineHeart className="text-2xl" />
        </div>
      </div>

      <Comments
        name="Nina Baldadze"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget."
      />
      <Comments
        name="Nina Baldadze"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget."
      />

      <div className="flex  gap-3">
        <img
          src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
          alt="profile"
          className="aspect-square w-10 h-10 object-cover rounded-full "
        />
        <div className="bg-secondary w-full flex items-center rounded-md">
          <input
            type="text"
            placeholder="Write a comment"
            className="w-full px-5 py-2 bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default QuotePost;
