import {
  AddQuote,
  DashboaradPortal,
  EditMovieModal,
  MovieWrapper,
  SingleQuote,
} from "@/components";
import { BiPencil } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlusSquare } from "react-icons/ai";
import useMovie from "hooks/useMovie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Genre, Movie, Quote } from "global";
import { destroyCookie, parseCookies } from "nookies";
import axios from "axios";

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
    reFetchMovie,
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

      <div className="grid gap-0 md:grid-cols-column4 py-6 ">
        <div>
          {
            <img
              src={
                movie
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${movie.img}`
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${initialMovie.img}`
              }
              alt=""
              className="flex-1  rounded-md w-full h-72  md:h-56 xl:h-96 object-cover "
            />
          }

          <div className="hidden md:block ">
            <div className="flex gap-3  items-center py-6 ">
              <p>{t("Quotes total", { number: movie?.quote?.length })}</p>

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
              movie?.quote?.map((quote: Quote) => {
                return (
                  <SingleQuote
                    key={quote.id}
                    quote={quote}
                    reFetchMovie={reFetchMovie}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:pl-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-between">
              {movie
                ? `${movie?.title[`${locale}`]} (${movie?.date?.slice(0, 4)})`
                : `${
                    initialMovie?.title[`${locale}`]
                  } (${initialMovie?.date?.slice(0, 4)})`}
            </div>
            <div className="flex bg-secondary items-center gap-3 px-4 py-2 rounded-md">
              <BiPencil className="cursor-pointer" onClick={showEditMovie} />
              |
              <BsTrash3 className="cursor-pointer" onClick={deleteMovie} />
            </div>
          </div>

          <div className="flex gap-2 pb-4 my-3">
            <div className="flex flex-wrap gap-3">
              {movie
                ? movie?.genre.map((genre: Genre) => {
                    return (
                      <h4
                        className=" px-3 py-1 bg-gray-500 text-white w-fit rounded-sm cursor-pointer text-sm"
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
            <p>{t("Quotes total", { number: movie?.quote?.length })}</p>
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
            movie?.quote?.map((quote: Quote) => {
              return (
                <SingleQuote
                  key={quote.id}
                  quote={quote}
                  reFetchMovie={reFetchMovie}
                />
              );
            })
          )}
        </div>
      </div>
    </MovieWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { params, req } = context;
    const { id } = params as { id: string };

    const cookies = parseCookies({ req });
    const cookiesString = Object.keys(cookies)
      .map((key) => `${key}=${cookies[key]}`)
      .join("; ");

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/movies/${id}`,
      {
        headers: {
          Cookie: cookiesString,
        },
      }
    );
    return {
      props: {
        initialMovie: data,
        messages: (await import(`../../locales/${context.locale}/common.json`))
          .default,
      },
    };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      destroyCookie(context, "user-email");

      return {
        redirect: {
          destination: "/landing",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

export default SingleMovie;
