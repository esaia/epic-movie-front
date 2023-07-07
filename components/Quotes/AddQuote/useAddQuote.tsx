import { AuthContext } from "context/AuthContext";
import { Movie, quoteForm } from "global";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addQuote } from "lib/index";

const useAddQuote = (movie: Movie | undefined, closeModal: () => void) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");
  const v = useTranslations("Validations");
  const formData = new FormData();
  const form = useForm<quoteForm>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  const { locale } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formdata: FormData) => addQuote(formdata),
    onSuccess: () => {
      closeModal();
    },
  });

  const onSubmit = (quote: quoteForm) => {
    Object.entries(quote).map((item) => {
      return formData.append(item[0], item[1]);
    });
    if (movie) formData.append("movie_id", movie?.id?.toString());
    if (user?.id !== undefined) formData.append("user_id", String(user.id));
    formData.append("img", quote.img[0]);

    mutate(formData);
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
    form,
    isLoading,
  };
};

export default useAddQuote;
