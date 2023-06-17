import {
  DashboaradPortal,
  MoviePost,
  MovieWrapper,
  CreateMovieModal,
} from "@/components";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Link from "next/link";
import { useMovies } from "@/hooks";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { Movie } from "global";
import axios from "axios";

const Movies = ({ initialMovies }: { initialMovies: Movie[] }) => {
  const { createMovieModal, closeModal, movies, t } = useMovies();

  return (
    <MovieWrapper>
      <DashboaradPortal isOpen={createMovieModal} closeModal={closeModal}>
        <CreateMovieModal />
      </DashboaradPortal>

      <div className="flex justify-between items-center  pb-10 w-full">
        <p className="md:text-xl">
          {t("My list of movies", {
            number: movies ? movies?.length : initialMovies.length,
          })}
        </p>
        <div className="flex items-center md:gap-6 gap-3">
          <div className=" justify-center items-center gap-2 text-gray-200 hidden md:flex">
            <BiSearch />
            <p className="text-gray">{t("Search")}</p>
          </div>

          <Link href={"/movies?modal=create-movie"}>
            <div className="bg-red-600 flex justify-center items-center  py-1  md:gap-3 gap-1 min-w-[120px] w-44 ">
              <AiOutlinePlusSquare className="text-xl" />
              <button>{t("Add movie")}</button>
            </div>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {movies
          ? movies.map((movie) => {
              return (
                <a key={movie.id} href={`/movies/${movie.id}`}>
                  <MoviePost movie={movie} />
                </a>
              );
            })
          : initialMovies.map((movie) => {
              return (
                <a key={movie.id} href={`/movies/${movie.id}`}>
                  <MoviePost movie={movie} />
                </a>
              );
            })}
      </div>
    </MovieWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req } = context;

    const cookies = parseCookies({ req });
    const cookiesString = Object.keys(cookies)
      .map((key) => `${key}=${cookies[key]}`)
      .join("; ");

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL_API + "/movies",
      {
        headers: {
          Cookie: cookiesString,
        },
      }
    );
    return {
      props: {
        initialMovies: data,
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
export default Movies;
