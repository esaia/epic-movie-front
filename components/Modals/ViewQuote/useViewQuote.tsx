import { AuthContext } from "context/AuthContext";
import { Quote, commentForm } from "global";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const useViewQuote = (quote: Quote) => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("SingleMovie");

  const [comments, setComments] = useState([]);
  const [fetchComments, setfetchComments] = useState(false);
  const form = useForm<commentForm>();
  const { handleSubmit, register, setValue } = form;

  const postComment = async (comment: commentForm) => {
    const { data } = await axiosAPI.post("/comments", comment);
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setfetchComments(!fetchComments);
      setValue("comment", "");
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
    const fetchComments = async () => {
      const { data } = await axiosAPI.get("/comments/" + quote.id);
      setComments(data);
      return data;
    };

    fetchComments();
  }, [fetchComments]);

  return { user, t, comments, handleSubmit, register, submitForm };
};

export default useViewQuote;
