import { recoveryPassType } from "global";
import { recoverPass } from "lib/index";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";

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

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: recoveryPassType) =>
      recoverPass({ ...data, email, token }),
    onSuccess: () => {
      router.push("/landing?modal=password-change-notification");
    },
  });

  const submitForm: SubmitHandler<recoveryPassType> = (data) => {
    mutate(data);
  };

  return { form, handleSubmit, submitForm, password, isLoading, n, v };
};

export default useRecoverPassword;
