import {
  AddQuote,
  DashboaradPortal,
  EditMovieModal,
  MovieWrapper,
  SingleQuote,
} from "@/components";
import Link from "next/link";
import { BiPencil } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlusSquare } from "react-icons/ai";
import useMovie from "./useMovie";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import type { Genre, Movie, Quote } from "global";
import axiosAPI from "lib/axios";

const SingleMovie = ({ initialMovie }: { initialMovie: Movie }) => {
  const {
    editMovieModal,
    addQuote,
    closeModal,
    locale,
    t,
    showEditMovie,
    showAddQuotes,
    movie,
    deleteMovie,
  } = useMovie();

  return (
    <MovieWrapper>
      <DashboaradPortal isOpen={editMovieModal} closeModal={closeModal}>
        <EditMovieModal movie={movie} closeModal={closeModal} />
      </DashboaradPortal>

      <DashboaradPortal isOpen={addQuote} closeModal={closeModal}>
        <AddQuote movie={movie} closeModal={closeModal} />
      </DashboaradPortal>

      <h1 className="text-xl">{t("Movie discription")}</h1>

      <div className="grid gap-5 md:grid-cols-column4 py-6 ">
        <div>
          {
            <img
              src={
                movie
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${movie.img}`
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${initialMovie.img}`
              }
              alt=""
              className="flex-1  rounded-md w-full md:h-56 xl:h-96 object-cover "
            />
          }

          <div className="hidden md:block">
            <div className="flex gap-3  items-center py-6 ">
              <p>{t("Quotes (Total 7)")}</p>
              <span>|</span>
              <div
                className="bg-red-600 w-fit flex justify-center items-center px-3 py-1  gap-3 rounded-md "
                onClick={showAddQuotes}
              >
                <AiOutlinePlusSquare />

                <button>{t("Add quote")}</button>
              </div>
            </div>

            {movie?.quote?.length === 0 ? (
              <h1>There are not quotes</h1>
            ) : (
              movie?.quote.map((quote: Quote) => {
                return <SingleQuote key={quote.id} quote={quote} />;
              })
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <div className="flex justify-between">
              {movie
                ? `${movie?.title[`${locale}`]} ${movie?.date?.slice(0, 4)}`
                : `${
                    initialMovie?.title[`${locale}`]
                  } ${initialMovie?.date?.slice(0, 4)}`}
            </div>
            <div className="flex bg-secondary items-center gap-3 px-4 py-2 rounded-md">
              <BiPencil className="cursor-pointer" onClick={showEditMovie} />
              |
              <BsTrash3 className="cursor-pointer" onClick={deleteMovie} />
            </div>
          </div>

          <div className="flex gap-2 pb-4 my-3">
            {movie
              ? movie?.genre.map((genre: Genre) => {
                  return (
                    <h4
                      className=" px-3 bg-gray-600 text-white w-fit rounded-sm cursor-pointer text-sm"
                      key={genre.value}
                    >
                      {genre.label}
                    </h4>
                  );
                })
              : initialMovie?.genre.map((genre: Genre) => {
                  return (
                    <h4
                      className=" px-3 bg-gray-600 text-white w-fit rounded-sm cursor-pointer text-sm"
                      key={genre.value}
                    >
                      {genre.label}
                    </h4>
                  );
                })}
          </div>

          <div className="flex items-center gap-2 pb-4 ">
            <p className="text-gray-300">{t("director")} </p>
            <h3>
              {movie
                ? movie?.director[`${locale}`]
                : initialMovie?.director[`${locale}`]}
            </h3>
          </div>

          <p className="text-gray-300">
            {movie
              ? movie?.description[`${locale}`]
              : initialMovie?.description[`${locale}`]}
          </p>
        </div>

        <div className="block md:hidden">
          <div className="flex gap-2 items-center py-6 ">
            <p>{t("Quotes (Total 7)")}</p>
            <span>|</span>
            <div className="bg-red-600 w-fit flex justify-center items-center px-3 py-1  gap-3 rounded-md ">
              <AiOutlinePlusSquare />
              <Link href={"/movies/id?modal=add-quote"}>
                <button>{t("Add quote")}</button>
              </Link>
            </div>
          </div>
          {/* <SingleQuote />
          <SingleQuote />
          <SingleQuote />
          <SingleQuote /> */}
        </div>
      </div>
    </MovieWrapper>
  );
};

export async function getStaticPaths(context: GetStaticPaths) {
  interface Movie {
    id: number;
  }

  const fetchMovieIds = async () => {
    const { data } = await axiosAPI.get("/movies");

    const movieIds = data.map((movie: Movie) => movie.id);
    return movieIds;
  };

  const movieIds = await fetchMovieIds();
  const locales: string[] = ["en", "ka"];
  const paths: { params: { id: string }; locale: string }[] = [];

  movieIds.forEach((id: number) => {
    locales.forEach((locale) => {
      paths.push({ params: { id: id.toString() }, locale });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { data } = await axiosAPI.get(`/movies/${context?.params?.id}`);

  return {
    props: {
      initialMovie: data,
      messages: (await import(`../../locales/${context.locale}/common.json`))
        .default,
    },
  };
}

export default SingleMovie;
