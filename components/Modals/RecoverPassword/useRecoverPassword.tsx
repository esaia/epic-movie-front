import { useForm, useWatch } from "react-hook-form";

const useRecoverPassword = () => {
  const form = useForm();
  const { handleSubmit, control } = form;

  const submitForm = () => {};
  const password = useWatch({
    control,
    name: "password",
  });

  return { form, handleSubmit, submitForm, password };
};

export default useRecoverPassword;
