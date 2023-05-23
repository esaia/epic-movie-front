import { useForm, useWatch } from "react-hook-form";

const useRegisterModal = () => {
  const form = useForm();
  const { handleSubmit, register, control } = form;
  const submitForm = () => {};

  const password = useWatch({
    control,
    name: "password",
  });

  return { handleSubmit, register, form, submitForm, password };
};

export default useRegisterModal;
