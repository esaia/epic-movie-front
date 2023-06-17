import { AuthContext } from "context/AuthContext";
import { Movie, quoteForm } from "global";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { relative } from "path";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

const useCreateQuoteModal = () => {
  const t = useTranslations("Home");
  const v = useTranslations("Validations");
  const [showMovies, setShowMovies] = useState(false);
  const [movieId, setMovieId] = useState<null | number>(null);
  const { user } = useContext(AuthContext);
  const { locale, push, reload } = useRouter();
  const formData = new FormData();

  const form = useForm<quoteForm>();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;

  const fetchMovies = async (): Promise<Movie[]> => {
    const { data } = await axiosAPI.get("/movies");
    return data;
  };

  const { data: movies } = useQuery("movies", fetchMovies);

  const addQuote = async () => {
    return await axiosAPI.post("/quotes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const { mutate } = useMutation({
    mutationFn: addQuote,
    onSuccess: () => {
      push("/");
      reload();
    },
  });

  const onSubmit = (quote: quoteForm) => {
    Object.entries(quote).map((item) => {
      return formData.append(item[0], item[1]);
    });

    if (movieId) formData.append("movie_id", movieId.toString());
    if (user?.id !== undefined) formData.append("user_id", String(user.id));
    formData.append("img", quote.img[0]);
    mutate();
  };

  return {
    v,
    t,
    locale,
    user,
    handleSubmit,
    register,
    form,
    onSubmit,
    errors,
    showMovies,
    setShowMovies,
    movies,
    setMovieId,
    movieId,
    control,
  };
};

export default useCreateQuoteModal;
