import { AxiosError } from "axios";
import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";

interface registerUserType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const useRegisterModal = () => {
  const t = useTranslations("Register");
  const v = useTranslations("Validations");

  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<registerUserType>();
  const { handleSubmit, register, control } = form;
  const router = useRouter();

  const storeUser = (user: registerUserType) => {
    return axiosAPI.post("/register", user);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: storeUser,
    onSuccess: () => {
      router.push("/landing?modal=emailcheck");
    },
    onError: (err: AxiosError) => {
      if (err?.response?.status === 422)
        setErrorMessage(t("This user already exists"));
    },
  });

  const onSubmit: SubmitHandler<registerUserType> = (user) => {
    return mutate(user);
  };

  const password = useWatch({
    control,
    name: "password",
  });

  return {
    handleSubmit,
    register,
    form,
    password,
    control,
    onSubmit,
    isLoading,
    errorMessage,
    t,
    v,
  };
};

export default useRegisterModal;
