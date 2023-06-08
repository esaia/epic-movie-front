import axios, { AxiosResponse } from "axios";
import { AuthContext } from "context/AuthContext";
import Cookies from "js-cookie";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface loginDataType {
  email: string;
  password: string;
  remember?: boolean;
}
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

  const loginUser = (user: loginDataType) => {
    return axiosAPI.post("/login", user);
  };

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }: AxiosResponse<axiosRes>) => {
      Cookies.set("user-email", data.user.email, { expires: 600 });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    },
    onError: () => {
      setErrorMessage(t("Unauthorized"));
    },
  });

  const onSubmit: SubmitHandler<loginDataType> = (user) => {
    const fetch = async () => {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`,
        {
          headers: { Accept: "application/json" },
          withCredentials: true,
        }
      );
    };
    fetch();

    return mutate(user);
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    form,
    control,
    errorMessage,
    t,
    v,
  };
};

export default useLoginModal;
