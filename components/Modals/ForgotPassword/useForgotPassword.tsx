import { useForm } from "react-hook-form";

const useForgotPassword = () => {
  const form = useForm();
  const { handleSubmit, register } = form;
  const submitForm = () => {};

  return { form, handleSubmit, register, submitForm };
};

export default useForgotPassword;
