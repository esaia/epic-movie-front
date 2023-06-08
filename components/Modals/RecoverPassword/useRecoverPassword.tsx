import axiosAPI from "lib/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";
import { recoveryPassType } from "./types";

const useRecoverPassword = () => {
  const n = useTranslations("NotificationModal");
  const v = useTranslations("Validations");

  const form = useForm<recoveryPassType>();
  const { handleSubmit, control } = form;
  const router = useRouter();
  const { email, token } = router.query;
  const password = useWatch({
    control,
    name: "password",
  });

  const recoverPass = (data: recoveryPassType) => {
    return axiosAPI.post("/update-password", { ...data, email, token });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: recoverPass,
    onSuccess: (data) => {
      router.push("/landing?modal=password-change-notification");
    },
  });

  const submitForm: SubmitHandler<recoveryPassType> = (data) => {
    mutate(data);
  };

  return { form, handleSubmit, submitForm, password, isLoading, n, v };
};

export default useRecoverPassword;
