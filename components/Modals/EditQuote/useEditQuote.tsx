import { AuthContext } from "context/AuthContext";
import { Quote, quoteForm } from "global";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const useEditQuote = (quote: Quote, closeModal: () => void) => {
  const { user } = useContext(AuthContext);
  const { query } = useRouter();
  const t = useTranslations("SingleMovie");
  const v = useTranslations("Validations");
  const queryClient = useQueryClient();
  const formData = new FormData();
  const form = useForm<quoteForm>({
    defaultValues: {
      quote_en: quote.quote.en,
      quote_ka: quote.quote.ka,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const editQuote = async () => {
    const { data } = await axiosAPI.post(`quotes/${quote.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: editQuote,
    onSuccess: () => {
      queryClient.invalidateQueries(["singleMovie", query.id]);

      closeModal();
    },
  });

  const submitForm = (quote: quoteForm) => {
    Object.entries(quote).map((item) => {
      if (item[0] === "img") {
        return;
      }
      return formData.append(item[0], item[1]);
    });

    if (user?.id !== undefined) formData.append("user_id", String(user.id));
    if (quote.img.length > 0) {
      formData.append("img", quote.img[0]);
    }
    mutate();
  };

  return { v, t, user, handleSubmit, register, errors, submitForm };
};

export default useEditQuote;
