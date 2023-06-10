import React from "react";
import { BsChatQuote } from "react-icons/bs";
import { Movie } from "../../global";
import useMoviePost from "./useMoviePost";

const MoviePost = ({ movie }: { movie: Movie }) => {
  const { locale } = useMoviePost();

  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${movie.img}`}
        alt=""
        className="rounded-md aspect-square w-full md:h-56 xl:h-80 object-cover"
      />
      <p className="py-2 text-xl">
        {movie.title[locale || "en"]} ({movie.date.slice(0, 4)})
      </p>
      <div className="flex items-center gap-2 text-xl">
        <div>{movie.quote?.length}</div>
        <BsChatQuote />
      </div>
    </div>
  );
};

export default MoviePost;
