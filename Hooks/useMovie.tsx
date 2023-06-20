import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useQuery, useQueryClient } from "react-query";
import axiosAPI from "lib/axios";
import { Movie } from "global";

const useMovie = () => {
  const [editMovieModal, setEditMovieModal] = useState<boolean>(false);
  const [addQuote, setAddQuote] = useState<boolean>(false);
  const t = useTranslations("SingleMovie");
  const queryClient = useQueryClient();
  const { locale, query, push } = useRouter();

  const closeModal = () => {
    setAddQuote(false);
    setEditMovieModal(false);
  };

  const showEditMovie = () => {
    setEditMovieModal(true);
  };

  const showAddQuotes = () => {
    setAddQuote(true);
  };

  const fetchMovie = async (): Promise<Movie> => {
    const { data } = await axiosAPI.get(`/movies/${query.id}`);
    return data;
  };

  const { data: movie } = useQuery(["singleMovie", query.id], {
    queryFn: fetchMovie,
  });

  useEffect(() => {
    queryClient.invalidateQueries(["singleMovie", query.id]);
  }, [editMovieModal, addQuote]);

  const deleteMovie = async () => {
    try {
      await axiosAPI.delete(`movies/${query.id}`);
      push("/movies");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    editMovieModal,
    addQuote,
    closeModal,
    t,
    locale,
    showEditMovie,
    showAddQuotes,
    movie,
    deleteMovie,
  };
};

export default useMovie;
