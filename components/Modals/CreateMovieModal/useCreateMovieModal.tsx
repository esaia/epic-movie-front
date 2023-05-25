import { useForm } from "react-hook-form";

interface ColourOption {
  value: string;
  label: string;
}

const useCreateMovieModal = () => {
  const form = useForm();
  const { handleSubmit, register } = form;
  const submitForm = () => {};

  const colourOptions: ColourOption[] = [
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
  ];

  return { handleSubmit, register, submitForm, form, colourOptions };
};

export default useCreateMovieModal;
