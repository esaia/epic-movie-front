import { AuthContext } from "context/AuthContext";
import { Movie, quoteForm } from "global";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";

const useAddQuote = (movie: Movie | undefined, closeModal: () => void) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");
  const v = useTranslations("Validations");

  const form = useForm<quoteForm>();
  const {
    handleSubmit,
    register,
    control,

    formState: { errors },
  } = form;

  const formData = new FormData();
  const { locale } = useRouter();

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
      closeModal();
    },
  });

  const onSubmit = (quote: quoteForm) => {
    Object.entries(quote).map((item) => {
      return formData.append(item[0], item[1]);
    });
    if (movie) formData.append("movie_id", movie?.id?.toString());
    formData.append("img", quote.img[0]);

    mutate();
  };

  return {
    user,
    locale,
    t,
    v,
    register,
    errors,
    handleSubmit,
    onSubmit,
    control,
    form,
  };
};

export default useAddQuote;
