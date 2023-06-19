import { AuthContext } from "context/AuthContext";
import { Quote, comment, commentForm } from "global";
import axiosAPI from "lib/axios";
import echo from "lib/pusher";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useViewQuote = (quote: Quote) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");
  const queryClient = useQueryClient();
  const form = useForm<commentForm>();
  const { handleSubmit, register, setValue } = form;

  const fetchQuoteComments = async () => {
    const { data } = await axiosAPI.get("/comments/" + quote.id);
    return data;
  };

  const { data: comments } = useQuery(["fetchQuoteComments", quote.id], {
    queryFn: fetchQuoteComments,
  });

  const postComment = async (comment: commentForm) => {
    const { data } = await axiosAPI.post("/comments", comment);
    return data;
  };

  const { mutate, isLoading: loadingPostComment } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setValue("comment", "");
      queryClient.invalidateQueries(["fetchQuoteComments", quote.id]);
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

  useEffect(() => {
    const handleCommentEvent = (payload: { comment: comment }) => {
      if (+payload.comment.quote_id === quote.id) {
        queryClient.invalidateQueries(["fetchQuoteComments", quote.id]);
      }
    };

    echo
      .channel("comments")
      .listen("CommentEvent", (payload: { comment: comment }) => {
        handleCommentEvent(payload);
      });

    return () => {
      echo
        .channel("comments")
        .stopListening("CommentEvent", handleCommentEvent);
      echo.leaveChannel("comments");
    };
  }, []);

  return {
    user,
    t,
    comments,
    handleSubmit,
    register,
    submitForm,
    loadingPostComment,
  };
};

export default useViewQuote;
