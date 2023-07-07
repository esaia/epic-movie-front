import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Quote, commentForm } from "global";
import { useForm } from "react-hook-form";
import { deleteLike, postComment, postLike } from "lib";
import { useTranslations } from "next-intl";
const useQuotePost = (quote: Quote) => {
  const t = useTranslations("Home");

  const { locale } = useRouter();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const form = useForm<commentForm>();
  const { handleSubmit, register, setValue } = form;
  const { mutate, isLoading: loadingPostComment } = useMutation({
    mutationFn: (comment: commentForm) => postComment(comment),
    onSuccess: (comment) => {
      setValue("comment", "");
      quote.comment?.push(comment);
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
      queryClient.invalidateQueries("fetchQuotes");

      const likeAttributes = { user_id: user?.id, quote_id: quote.id };
      if (!quote.like.some((item) => item.user_id === user?.id)) {
        await postLike(likeAttributes);
        queryClient.invalidateQueries("fetchQuotes");
      } else {
        if (user) {
          const likeID = quote.like.find(
            (item) => item.user_id === user?.id
          )?.id;
          await deleteLike(likeID);
          queryClient.invalidateQueries("fetchQuotes");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    locale,
    register,
    handleSubmit,
    submitForm,
    loadingPostComment,
    handleClickLike,
    user,
    t,
  };
};

export default useQuotePost;
