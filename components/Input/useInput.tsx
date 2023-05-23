import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";

interface inputProps {
  name: string;
}

const useInput = ({ name }: inputProps) => {
  const {
    formState: { errors },
    formState,
    register,
    getFieldState,
  } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { isDirty } = getFieldState(name, formState);
  const input = useWatch({ name });

  return { showPassword, setShowPassword, isDirty, input, errors, register };
};

export default useInput;
