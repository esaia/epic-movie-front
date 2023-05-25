import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useMovie = () => {
  const [editMovieModal, setEditMovieModal] = useState<boolean>(true);
  const router = useRouter();
  const closeModal = () => {
    router.push("/movies/id");
  };

  useEffect(() => {
    const { modal } = router.query;
    setEditMovieModal(modal === "edit-movie");
  }, [router]);

  return { editMovieModal, closeModal };
};

export default useMovie;
