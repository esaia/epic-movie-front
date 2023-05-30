import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";

interface registerUserType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const useRegisterModal = () => {
  const form = useForm<registerUserType>();
  const { handleSubmit, register, control } = form;
  const router = useRouter();

  const storeUser = (user: registerUserType) => {
    return axiosAPI.post("/register", user);
  };

  const { mutate } = useMutation({
    mutationFn: storeUser,
    onSuccess: () => {
      router.push("/landing?modal=emailcheck");
    },
  });

  const onSubmit: SubmitHandler<registerUserType> = (user) => {
    return mutate(user);
  };

  const password = useWatch({
    control,
    name: "password",
  });

  return { handleSubmit, register, form, password, control, onSubmit };
};

export default useRegisterModal;
