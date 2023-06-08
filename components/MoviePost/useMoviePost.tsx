import { useRouter } from "next/router";

const useMoviePost = () => {
  const { locale } = useRouter();

  return { locale };
};

export default useMoviePost;
