import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useMovie = () => {
  const [editMovieModal, setEditMovieModal] = useState<boolean>(false);
  const [addQuote, setAddQuote] = useState<boolean>(false);

  const router = useRouter();
  const closeModal = () => {
    router.push("/movies/id");
  };

  useEffect(() => {
    const { modal } = router.query;
    setEditMovieModal(modal === "edit-movie");
    setAddQuote(modal === "add-quote");
  }, [router, router.query]);

  return { editMovieModal, addQuote, closeModal };
};

export default useMovie;
