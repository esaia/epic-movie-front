import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface inputProps {
  name: string;
}

const useInput = ({ name }: inputProps) => {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const input = useWatch({ name });

  return {
    showPassword,
    setShowPassword,
    input,
    errors,
    register,
    isSubmitted,
  };
};

export default useInput;
