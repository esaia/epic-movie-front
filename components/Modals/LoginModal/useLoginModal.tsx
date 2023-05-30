import { SubmitHandler, useForm } from "react-hook-form";

interface loginDataType {
  email: string;
  password: string;
  remember?: boolean;
}

const useLoginModal = () => {
  const form = useForm<loginDataType>();
  const { handleSubmit, register, control } = form;

  const onSubmit: SubmitHandler<loginDataType> = () => {};

  return { handleSubmit, register, onSubmit, form, control };
};

export default useLoginModal;
