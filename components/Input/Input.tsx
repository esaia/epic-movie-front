import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";

interface inputProps {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  registerOptions?: object;
}
const Input = ({
  name,
  label,
  required = false,
  placeholder = "",
  type = "text",
  registerOptions,
}: inputProps) => {
  const {
    formState: { errors },
    formState,
    register,
    getFieldState,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { isDirty } = getFieldState(name, formState);
  const input = useWatch({ name });

  return (
    <div className="w-full flex  justify-center items-start gap-2 flex-col ">
      <label htmlFor="">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`relative flex items-center bg-gray-300 text-gray-900 w-full rounded-sm overflow-hidden border 
        ${
          errors[name]
            ? "border-red-500"
            : isDirty && input?.length !== 0 && "border-green-500"
        }
        `}
      >
        {type === "password" ? (
          <>
            <input
              type={showPassword ? "password" : "text"}
              {...register(name, registerOptions)}
              className="outline-none placeholder:text-gray-400 bg-transparent w-full px-2 py-2 "
              placeholder={placeholder}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 cursor-pointer "
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
            <div className="absolute right-7 cursor-pointer">
              {errors["name"] ? (
                <BiErrorCircle className="text-red-600 text-xl" />
              ) : (
                isDirty &&
                input?.length !== 0 && (
                  <IoMdCheckmark className="text-green-600 text-xl" />
                )
              )}
            </div>
          </>
        ) : (
          <>
            <input
              type={type}
              {...register(name, registerOptions)}
              className="outline-none placeholder:text-gray-400 bg-transparent w-full px-2 py-2 "
              placeholder={placeholder}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 cursor-pointer"
            >
              {errors["name"] ? (
                <BiErrorCircle className="text-red-600 text-xl" />
              ) : (
                isDirty &&
                input?.length !== 0 && (
                  <IoMdCheckmark className="text-green-600 text-xl" />
                )
              )}
            </div>
          </>
        )}
      </div>
      <div className="h-5 mt-[-5px]">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-sm text-red-500 ml-3">{message}</p>
          )}
        />
      </div>
    </div>
  );
};

export default Input;
