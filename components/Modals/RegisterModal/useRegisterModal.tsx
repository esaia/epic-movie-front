import { SubmitHandler, useForm, useWatch } from "react-hook-form";

interface loginDataType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const useRegisterModal = () => {
  const form = useForm<loginDataType>();
  const { handleSubmit, register, control } = form;

  const onSubmit: SubmitHandler<loginDataType> = () => {};

  const password = useWatch({
    control,
    name: "password",
  });

  return { handleSubmit, register, form, password, control, onSubmit };
};

export default useRegisterModal;
