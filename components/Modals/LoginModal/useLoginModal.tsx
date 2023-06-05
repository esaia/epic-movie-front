import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";
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
  updated_at: string;
}

const useLoginModal = () => {
  const form = useForm<loginDataType>();
  const { handleSubmit, register, control } = form;
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const loginUser = (user: loginDataType) => {
    return axiosAPI.post("/login", user);
  };

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }: AxiosResponse<axiosRes>) => {
      Cookies.set("user-email", data.user.email, { expires: 120 });
      router.push("/");
    },
    onError: () => {
      setErrorMessage("Unauthorized. Please check your credentials.");
    },
  });

  const onSubmit: SubmitHandler<loginDataType> = (user) => {
    const fetch = async () => {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        headers: { Accept: "application/json" },
        withCredentials: true,
      });
    };
    fetch();

    return mutate(user);
  };

  return { handleSubmit, register, onSubmit, form, control, errorMessage };
};

export default useLoginModal;
