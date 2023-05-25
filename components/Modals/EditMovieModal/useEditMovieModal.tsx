import { useForm } from "react-hook-form";

const useEditMovieModal = () => {
  const form = useForm();
  const { handleSubmit, register } = form;
  const submitForm = () => {};

  return { handleSubmit, register, submitForm, form };
};

export default useEditMovieModal;
