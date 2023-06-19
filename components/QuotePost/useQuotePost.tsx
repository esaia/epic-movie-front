import { AuthContext } from "context/AuthContext";
import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Quote, comment, commentForm } from "global";
import { useForm } from "react-hook-form";
import echo from "lib/pusher";
import { changeLanguage } from "i18next";

const useQuotePost = (quote: Quote) => {
  const { locale } = useRouter();
  const { user } = useContext(AuthContext);
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
    if (!data.comment) return;
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
    locale,
    register,
    handleSubmit,
    submitForm,
    comments,
    loadingPostComment,
  };
};

export default useQuotePost;
