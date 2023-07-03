import { AuthContext } from "context/AuthContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import type { movieTypeForm, Movie } from "global";
import { useRouter } from "next/router";
import { getAllgenres, updateMovie } from "lib/index";

const useEditMovieModal = (
  movie: Movie | undefined,
  closeModal: () => void
) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");
  const v = useTranslations("Validations");
  const { query, locale } = useRouter();
  const formData = new FormData();

  const form = useForm<movieTypeForm>({
    defaultValues: {
      title_en: movie?.title.en,
      title_ka: movie?.title.ka,
      genre: movie?.genres.map((item) => {
        return { ...item, label: item.label[`${locale}`], pivot: "" };
      }),
      date: movie?.date,
      director_en: movie?.director.en,
      director_ka: movie?.director.ka,
      description_en: movie?.description.en,
      description_ka: movie?.description.ka,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;

  const { data: genres } = useQuery(["genres"], {
    queryFn: getAllgenres,
  });

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => updateMovie(formData, query.id),
    onSuccess: () => {
      closeModal();
    },
  });

  const submitForm = (movie: movieTypeForm) => {
    Object.entries(movie).map((item) => {
      if (item[0] === "img") {
        return;
      }
      return formData.append(item[0], item[1]);
    });

    if (movie.img.length !== 0) {
      formData.append("img", movie.img[0]);
    }

    const genresId = movie.genre.map((item) => {
      return item.id;
    });
    formData.append("genre", JSON.stringify(genresId));

    mutate(formData);
  };

  return {
    user,
    handleSubmit,
    register,
    submitForm,
    form,
    errors,
    v,
    t,
    control,
    genres,
    locale,
  };
};

export default useEditMovieModal;
