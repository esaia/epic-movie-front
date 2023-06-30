import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useQuery, useQueryClient } from "react-query";
import { deleteMovieRequest, fetchMovie } from "lib/index";

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

  const { data: movie } = useQuery(["singleMovie", query.id], {
    queryFn: () => fetchMovie(query.id),
  });

  useEffect(() => {
    queryClient.invalidateQueries(["singleMovie", query.id]);
  }, [editMovieModal, addQuote]);

  const deleteMovie = async () => {
    await deleteMovieRequest(query.id);
    queryClient.invalidateQueries(["singleMovie", query.id]);
    push("/movies");
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
