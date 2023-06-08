import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useQuery } from "react-query";
import axiosAPI from "lib/axios";

const useMovie = () => {
  const [editMovieModal, setEditMovieModal] = useState<boolean>(false);
  const [addQuote, setAddQuote] = useState<boolean>(false);
  const t = useTranslations("SingleMovie");

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

  const fetchMovie = async () => {
    const { data } = await axiosAPI.get(`/movies/${query.id}`);
    return data;
  };

  const { data: movie, refetch } = useQuery({
    queryFn: fetchMovie,
  });

  useEffect(() => {
    refetch();
  }, [editMovieModal]);

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
    refetch,
    deleteMovie,
  };
};

export default useMovie;
