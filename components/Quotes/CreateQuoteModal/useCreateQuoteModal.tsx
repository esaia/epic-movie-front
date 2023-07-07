import { AuthContext } from "context/AuthContext";
import { Movie, quoteForm } from "global";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { fetchMovies, addQuote } from "lib/index";

const useCreateQuoteModal = () => {
  const t = useTranslations("Home");
  const v = useTranslations("Validations");
  const [showMovies, setShowMovies] = useState(false);
  const [movieId, setMovieId] = useState<null | number>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(AuthContext);
  const { locale } = useRouter();
  const formData = new FormData();
  const [movieTitle, setmovieTitle] = useState("");
  const form = useForm<quoteForm>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = form;

  const { data: movies } = useQuery<Movie[]>(["movies"], {
    queryFn: () => fetchMovies(),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (formdata: FormData) => addQuote(formdata),
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const onSubmit = (quote: quoteForm) => {
    if (!movieId) {
      setErrorMessage(v("This field is required"));
      return;
    }

    Object.entries(quote).map((item) => {
      return formData.append(item[0], item[1]);
    });

    if (movieId) formData.append("movie_id", movieId.toString());
    if (user?.id !== undefined) formData.append("user_id", String(user.id));
    formData.append("img", quote.img[0]);
    mutate(formData);
  };

  useEffect(() => {
    if (isSubmitted && !movieId) {
      setErrorMessage(v("This field is required"));
    }
  }, [errors]);

  useEffect(() => {
    if (movies) {
      const movie = movies.find((movie) => movie.id === movieId);
      if (movie && movie.title && movie.title.en) {
        setmovieTitle(movie.title[`${locale}`]);
      }
    }
  }, [movieId]);

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
    setErrorMessage,
    errorMessage,
    isLoading,
    movieTitle,
  };
};

export default useCreateQuoteModal;
