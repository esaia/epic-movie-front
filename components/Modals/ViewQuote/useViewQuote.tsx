import { AuthContext } from "context/AuthContext";
import { Quote, commentForm } from "global";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { deleteQuoteRequest, postComment } from "lib/index";
import { useRouter } from "next/router";

const useViewQuote = (quote: Quote, closeModal: () => void) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");
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

  const deleteQuote = () => {
    deleteQuoteRequest(quote.id);
    queryClient.invalidateQueries(["singleMovie", query?.id]);
    closeModal();
  };

  const submitForm = (data: { comment: string }) => {
    if (user)
      mutate({
        ...data,
        user_id: user?.id?.toString(),
        quote_id: quote.id.toString(),
      });
  };

  return {
    user,
    t,
    handleSubmit,
    register,
    submitForm,
    loadingPostComment,
    deleteQuote,
  };
};

export default useViewQuote;
