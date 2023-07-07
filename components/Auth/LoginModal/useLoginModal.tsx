import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthContext } from "context/AuthContext";
import { loginDataType } from "global";
import Cookies from "js-cookie";
import { addCsrf, loginUser } from "lib";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface axiosRes {
  user: User;
}
interface User {
  created_at: string;
  email: string;
  creemail_verified_atated_at: string;
  id: number;
  name: string;
  img: string;
  google_id: string;
  updated_at: string;
}

const useLoginModal = () => {
  const t = useTranslations("Login");
  const v = useTranslations("Validations");
  const form = useForm<loginDataType>();
  const { handleSubmit, register, control } = form;
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(AuthContext);

  const router = useRouter();

  const { isLoading, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }: AxiosResponse<axiosRes>) => {
      Cookies.set("user-email", data.user.email, { expires: 600 });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    },
    onError: (err: AxiosError) => {
      if (err.response?.data.message === "Email or password is incorrect") {
        setErrorMessage(t("Unauthorized"));
      } else if (err.response?.data.message === "user email is not verified") {
        setErrorMessage(t("verify email"));
      } else {
        setErrorMessage("somthing went wrong");
      }
    },
  });

  const onSubmit: SubmitHandler<loginDataType> = (user) => {
    addCsrf();

    return mutate(user);
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    form,
    control,
    errorMessage,
    isLoading,
    t,
    v,
  };
};

export default useLoginModal;
