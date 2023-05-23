import { useForm } from "react-hook-form";

const useLoginModal = () => {
  const form = useForm();
  const { handleSubmit, register, control, formState } = form;
  const submitForm = () => {};

  return { handleSubmit, register, submitForm, form, control };
};

export default useLoginModal;
