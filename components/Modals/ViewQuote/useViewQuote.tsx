import { AuthContext } from "context/AuthContext";
import { Quote, commentForm } from "global";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteLike,
  deleteQuoteRequest,
  postComment,
  postLike,
} from "lib/index";
import { useRouter } from "next/router";

const useViewQuote = (quote: Quote, closeModal: () => void) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");
  const h = useTranslations("Home");
  const queryClient = useQueryClient();
  const form = useForm<commentForm>();
  const { handleSubmit, register, setValue } = form;
  const { query } = useRouter();

  const { mutate, isLoading: loadingPostComment } = useMutation({
    mutationFn: (comment: commentForm) => postComment(comment),
    onSuccess: (comment) => {
      setValue("comment", "");
      quote.comment?.push(comment);

      queryClient.invalidateQueries(["fetchQuotes"]);
      queryClient.invalidateQueries(["singleMovie", query?.id]);
    },
  });

  const submitForm = (data: { comment: string }) => {
    if (!data.comment) return;
    if (user)
      mutate({
        ...data,
        user_id: user?.id?.toString(),
        quote_id: quote.id.toString(),
      });
  };

  const handleClickLike = async () => {
    try {
      const likeAttributes = { user_id: user?.id, quote_id: quote.id };
      if (!quote.like.some((item) => item.user_id === user?.id)) {
        await postLike(likeAttributes);
        queryClient.invalidateQueries(["singleMovie", query?.id]);
        queryClient.invalidateQueries(["quote", quote?.id]);
        queryClient.invalidateQueries(["fetchNotification"]);
        queryClient.invalidateQueries(["fetchQuotes"]);
      } else {
        if (user) {
          const likeID = quote.like.find(
            (item) => item.user_id === user?.id
          )?.id;
          await deleteLike(likeID);
          queryClient.invalidateQueries(["singleMovie", query?.id]);
          queryClient.invalidateQueries(["quote", quote?.id.toString()]);
          queryClient.invalidateQueries(["fetchNotification"]);
          queryClient.invalidateQueries(["fetchQuotes"]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    t,
    handleSubmit,
    register,
    submitForm,
    loadingPostComment,
    handleClickLike,
    quote,
    h,
  };
};

export default useViewQuote;
