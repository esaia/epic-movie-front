import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const useMovie = () => {
  const [editMovieModal, setEditMovieModal] = useState<boolean>(false);
  const [addQuote, setAddQuote] = useState<boolean>(false);
  const t = useTranslations("SingleMovie");

  const router = useRouter();
  const closeModal = () => {
    router.push("/movies/id");
  };

  useEffect(() => {
    const { modal } = router.query;
    setEditMovieModal(modal === "edit-movie");
    setAddQuote(modal === "add-quote");
  }, [router, router.query]);

  return { editMovieModal, addQuote, closeModal, t };
};

export default useMovie;
