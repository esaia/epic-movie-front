import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getAllgenres, addMovie } from "lib/index";
import { movieTypeForm } from "@/global";

const useCreateMovieModal = () => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("Movies");
  const v = useTranslations("Validations");

  const formData = new FormData();
  const { push, pathname, locale } = useRouter();
  const form = useForm<movieTypeForm>();
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
    mutationFn: (formData: FormData) => addMovie(formData),
    onSuccess: () => {
      push(pathname);
    },
    onError: (err: AxiosError) => {
      console.error(err);
    },
  });

  const onSubmit: SubmitHandler<movieTypeForm> = (movie) => {
    Object.entries(movie).map((item) => {
      return formData.append(item[0], item[1]);
    });

    if (user?.id !== undefined) {
      formData.append("user_id", String(user.id));
    }
    formData.append("img", movie.img[0]);
    const genresId = movie.genre.map((item) => {
      return item.id;
    });
    formData.append("genre", JSON.stringify(genresId));

    return mutate(formData);
  };

  return {
    user,
    handleSubmit,
    register,
    form,
    genres,
    errors,
    control,
    onSubmit,
    locale,
    t,
    v,
  };
};

export default useCreateMovieModal;
