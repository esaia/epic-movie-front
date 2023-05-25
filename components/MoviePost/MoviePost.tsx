import React from "react";
import { BsChatQuote } from "react-icons/bs";

const MoviePost = () => {
  return (
    <div>
      <img
        src="https://media.istockphoto.com/id/1237804526/vector/movie-night-concept-with-popcorn-cinema-tickets-drink-tape-in-cartoon-style-movie-or-cinema.jpg?s=612x612&w=0&k=20&c=FWIp6SXBqUg-_PWtoTxOy00b2aeg5xNDiRcFr6IF4l4="
        alt=""
        className="rounded-md w-full md:h-56 xl:h-96 object-cover"
      />
      <p className="py-2 text-xl">Loki Mobius (2021) </p>
      <div className="flex items-center gap-2 text-xl">
        <div>10</div>
        <BsChatQuote />
      </div>
    </div>
  );
};

export default MoviePost;
