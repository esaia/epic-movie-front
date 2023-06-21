import { forgetPasswordType } from "global";
import { forgetPassword } from "lib";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

const useForgotPassword = () => {
  const t = useTranslations("Forgot");
  const v = useTranslations("Validations");

  const form = useForm<forgetPasswordType>();
  const { handleSubmit, register } = form;
  const [errorMessage, seterrorMessage] = useState("");

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: (email: string) => forgetPassword(email),
    onSuccess: () => {
      router.push("/landing?modal=forgot-password-check");
    },
    onError: () => seterrorMessage("email not found"),
  });

  const onSubmit = (email: string) => {
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
