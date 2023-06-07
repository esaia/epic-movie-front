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
import { GetStaticPropsContext } from "next";

const Movies = () => {
  const { createMovieModal, closeModal, movies, locale } = useMovies();

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
        {movies &&
          movies.map((movie) => {
            return (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <MoviePost
                  title={movie.title[locale || "en"]}
                  img={movie.img}
                />
              </Link>
            );
          })}
      </div>
    </MovieWrapper>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../locales/${context.locale}/common.json`))
        .default,
    },
  };
}

export default Movies;
