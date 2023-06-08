import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface forgetPasswordType {
  email: string;
}

const useForgotPassword = () => {
  const t = useTranslations("Forgot");
  const v = useTranslations("Validations");

  const form = useForm<forgetPasswordType>();
  const { handleSubmit, register } = form;
  const [errorMessage, seterrorMessage] = useState("");

  const router = useRouter();

  const loginUser = (email: forgetPasswordType) => {
    return axiosAPI.post("/forgot-password", email);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/landing?modal=forgot-password-check");
    },
    onError: () => seterrorMessage("email not found"),
  });

  const onSubmit: SubmitHandler<forgetPasswordType> = (email) => {
    mutate(email);
  };

  return {
    form,
    handleSubmit,
    register,
    onSubmit,
    errorMessage,
    isLoading,
    t,
    v,
  };
};

export default useForgotPassword;
