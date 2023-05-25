import {
  DashboaradPortal,
  MoviePost,
  MovieWrapper,
  CreateMovieModal,
} from "@/components";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Link from "next/link";
import useMovies from "./useMovies";

const Movies = () => {
  const { createMovieModal, closeModal } = useMovies();
  return (
    <MovieWrapper>
      <DashboaradPortal isOpen={createMovieModal} closeModal={closeModal}>
        <CreateMovieModal />
      </DashboaradPortal>

      <div className="flex justify-between items-center  pb-10 w-full">
        <p className="md:text-xl">My list of movies (Total 25)</p>
        <div className="flex items-center md:gap-6 gap-3">
          <div className=" justify-center items-center gap-2 text-gray-200 hidden md:flex">
            <BiSearch />
            <p className="text-gray">Search</p>
          </div>

          <div className="bg-red-600 flex justify-center items-center px-2 py-1  md:gap-3 gap-1  text-sm min-w-[120px]">
            <AiOutlinePlusSquare />
            <Link href={"/movies?modal=create-movie"}>
              <button>Add movie</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <MoviePost />
        <MoviePost />
        <MoviePost />
        <MoviePost />
        <MoviePost />
        <MoviePost />
        <MoviePost />
        <MoviePost />
        <MoviePost />
      </div>
    </MovieWrapper>
  );
};

export default Movies;
