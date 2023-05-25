import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useMovies = () => {
  const [createMovieModal, setcreateMovieModal] = useState<boolean>(true);
  const router = useRouter();
  const closeModal = () => {
    router.push("/movies");
  };
  useEffect(() => {
    const { modal } = router.query;
    setcreateMovieModal(modal === "create-movie");
  }, [router]);

  return { createMovieModal, closeModal };
};

export default useMovies;
