import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { Movie } from "global";
import { useTranslations } from "next-intl";
import { fetchMovies } from "lib/index";
const useMovies = () => {
  const [createMovieModal, setcreateMovieModal] = useState<boolean>(false);
  const t = useTranslations("Movies");
  const { push, query } = useRouter();
  const closeModal = () => {
    push("/movies");
  };

  const { data: movies, refetch: refetchMovies } = useQuery<Movie[]>(
    ["movies"],
    fetchMovies
  );

  useEffect(() => {
    const { modal } = query;
    setcreateMovieModal(modal === "create-movie");
  }, [query]);

  useEffect(() => {
    refetchMovies();
  }, [createMovieModal]);

  return {
    createMovieModal,
    closeModal,
    movies,
    t,
  };
};

export default useMovies;
