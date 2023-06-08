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

const SingleMovie = () => {
  const { editMovieModal, addQuote, closeModal, t } = useMovie();

  return (
    <MovieWrapper>
      <DashboaradPortal isOpen={editMovieModal} closeModal={closeModal}>
        <EditMovieModal />
      </DashboaradPortal>

      <DashboaradPortal isOpen={addQuote} closeModal={closeModal}>
        <AddQuote />
      </DashboaradPortal>

      <h1 className="text-xl">{t("Movie discription")}</h1>

      <div className="grid gap-5 md:grid-cols-column4 py-6 ">
        <div>
          <img
            src="https://media.istockphoto.com/id/1237804526/vector/movie-night-concept-with-popcorn-cinema-tickets-drink-tape-in-cartoon-style-movie-or-cinema.jpg?s=612x612&w=0&k=20&c=FWIp6SXBqUg-_PWtoTxOy00b2aeg5xNDiRcFr6IF4l4="
            alt=""
            className="flex-1  rounded-md w-full md:h-56 xl:h-96 object-cover "
          />
          <div className="hidden md:block">
            <div className="flex gap-3  items-center py-6 ">
              <p>{t("Quotes (Total 7)")}</p>
              <span>|</span>
              <div className="bg-red-600 w-fit flex justify-center items-center px-3 py-1  gap-3 rounded-md ">
                <AiOutlinePlusSquare />
                <Link href={"/movies/id?modal=add-quote"}>
                  <button>{t("Add quote")}</button>
                </Link>
              </div>
            </div>
            <SingleQuote />
            <SingleQuote />
            <SingleQuote />
            <SingleQuote />
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <div className="flex justify-between">COMMITMENT HASAN (1999)</div>
            <div className="flex bg-secondary items-center gap-3 px-4 py-2 rounded-md">
              <Link href={"/movies/id?modal=edit-movie"}>
                <BiPencil className="cursor-pointer" />
              </Link>
              |
              <BsTrash3 className="cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-2 pb-4">
            <h4 className="py-1 px-3 bg-gray-400 text-white w-fit rounded-md cursor-pointer">
              Drama
            </h4>
            <h4 className="py-1 px-3 bg-gray-400 text-white w-fit rounded-md cursor-pointer">
              Romance
            </h4>
          </div>

          <div className="flex items-center gap-2 pb-4 ">
            <p className="text-gray-300">{t("director")} </p>
            <h3>NICK CASSAVETES</h3>
          </div>

          <p className="text-gray-300">
            In a nursing home, resident Duke reads a romance story to an old
            woman who has senile dementia with memory loss. In the late 1930s,
            wealthy seventeen year-old Allie Hamilton is spending summer
            vacation in Seabrook. Local worker Noah Calhoun meets Allie at a
            carnival
          </p>

          <p className="text-gray-300 mt-2">
            In a nursing home, resident Duke reads a romance story to an old
            woman who has senile dementia with memory loss.
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
          <SingleQuote />
          <SingleQuote />
          <SingleQuote />
          <SingleQuote />
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/movies`
    );
    const data = await response.json();
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
  return {
    props: {
      messages: (await import(`../../locales/${context.locale}/common.json`))
        .default,
    },
  };
}

export default SingleMovie;
