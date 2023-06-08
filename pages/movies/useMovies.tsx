import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axiosAPI from "lib/axios";
import { AxiosResponse } from "axios";
import { Movie } from "./types";
import { useTranslations } from "next-intl";

const useMovies = () => {
  const [createMovieModal, setcreateMovieModal] = useState<boolean>(false);
  const t = useTranslations("Movies");

  const { push, query } = useRouter();
  const closeModal = () => {
    push("/movies");
  };

  const fetchMovies = () => {
    return axiosAPI.get("/movies");
  };

  const { data: movies, refetch } = useQuery<AxiosResponse<Movie[]>>(
    "users",
    fetchMovies
  );

  useEffect(() => {
    const { modal } = query;
    setcreateMovieModal(modal === "create-movie");
  }, [query]);

  useEffect(() => {
    refetch();
  }, [createMovieModal]);

  return {
    createMovieModal,
    closeModal,
    movies: movies?.data,
    t,
  };
};

export default useMovies;
