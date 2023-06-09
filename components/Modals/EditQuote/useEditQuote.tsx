import { AuthContext } from "context/AuthContext";
import { Quote, quoteForm } from "global";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const useEditQuote = (
  quote: Quote,
  closeModal: () => void,
  reFetchMovie: () => void
) => {
  const { user } = useContext(AuthContext);
  const v = useTranslations("Validations");

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
      reFetchMovie();
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

    if (quote.img.length > 0) {
      formData.append("img", quote.img[0]);
    }
    mutate();
  };

  return { v, user, handleSubmit, register, errors, submitForm };
};

export default useEditQuote;
