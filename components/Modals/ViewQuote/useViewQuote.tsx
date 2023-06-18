import { AuthContext } from "context/AuthContext";
import { Quote, commentForm } from "global";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

const useViewQuote = (quote: Quote) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");

  const form = useForm<commentForm>();
  const { handleSubmit, register, setValue } = form;

  const fetchQuoteComments = async () => {
    const { data } = await axiosAPI.get("/comments/" + quote.id);
    return data;
  };

  const { data: comments, refetch: refetchComments } = useQuery(
    "fetchQuoteComments" + quote.id,
    {
      queryFn: fetchQuoteComments,
    }
  );

  const postComment = async (comment: commentForm) => {
    const { data } = await axiosAPI.post("/comments", comment);
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setValue("comment", "");
      refetchComments();
    },
  });

  const submitForm = (data: { comment: string }) => {
    if (user)
      mutate({
        ...data,
        user_id: user?.id?.toString(),
        quote_id: quote.id.toString(),
      });
  };

  return { user, t, comments, handleSubmit, register, submitForm };
};

export default useViewQuote;
