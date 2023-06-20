import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Quote, commentForm } from "global";
import { useForm } from "react-hook-form";
import { postComment } from "lib";
const useQuotePost = (quote: Quote) => {
  const { locale } = useRouter();
  const { user } = useContext(AuthContext);
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

  return {
    locale,
    register,
    handleSubmit,
    submitForm,
    loadingPostComment,
  };
};

export default useQuotePost;
