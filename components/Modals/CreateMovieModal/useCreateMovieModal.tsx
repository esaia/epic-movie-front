import { AxiosError } from "axios";
import axiosAPI from "lib/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { genresOption, movieTypeForm } from "./types";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const useCreateMovieModal = () => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("Movies");

  const formData = new FormData();
  const { push, pathname } = useRouter();
  const form = useForm<movieTypeForm>();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;

  const genres: genresOption[] = [
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
  ];

  const storeUser = () => {
    return axiosAPI.post("/movies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  };

  const { mutate } = useMutation({
    mutationFn: storeUser,
    onSuccess: () => {
      push(pathname);
    },
    onError: (err: AxiosError) => {
      console.log(err);
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
    formData.append("genre", JSON.stringify(movie.genre));

    return mutate();
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
    t,
  };
};

export default useCreateMovieModal;
