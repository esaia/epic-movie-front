import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import axiosAPI from "lib/axios";
import { AxiosResponse } from "axios";
import { Movie } from "global";
import { useTranslations } from "next-intl";

const useMovies = () => {
  const [createMovieModal, setcreateMovieModal] = useState<boolean>(false);
  const t = useTranslations("Movies");
  const { push, query } = useRouter();
  const closeModal = () => {
    push("/movies");
  };

  const fetchMovies = () => {
    return axiosAPI.get("/movies", {
      withCredentials: true,
    });
  };

  const { data: movies, refetch: refetchMovies } = useQuery<
    AxiosResponse<Movie[]>
  >(["movies"], fetchMovies);

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
    movies: movies?.data,
    t,
  };
};

export default useMovies;
