import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Movie, queryType } from "global";
import { useTranslations } from "next-intl";
import { fetchMovies } from "lib/index";
import { useForm } from "react-hook-form";

const useMovies = () => {
  const [createMovieModal, setcreateMovieModal] = useState<boolean>(false);
  const [movieQuery, setMovieQuery] = useState("");
  const t = useTranslations("Movies");
  const { push, query } = useRouter();
  const closeModal = () => {
    push("/movies");
  };

  const form = useForm<queryType>();
  const { register, handleSubmit } = form;

  const {
    data: movies,
    refetch: refetchMovies,
    isLoading,
  } = useQuery<Movie[]>(["movies"], {
    queryFn: () => fetchMovies(movieQuery),
  });

  const onSubmit = (query: queryType) => {
    setMovieQuery(query.searchQuery);
  };

  useEffect(() => {
    const { modal } = query;
    setcreateMovieModal(modal === "create-movie");
  }, [query]);

  useEffect(() => {
    refetchMovies();
  }, [createMovieModal, movieQuery]);

  return {
    createMovieModal,
    closeModal,
    movies,
    t,
    onSubmit,
    register,
    handleSubmit,
    isLoading,
  };
};

export default useMovies;
