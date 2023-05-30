import { ErrorMessage } from "@hookform/error-message";
import useInput from "./useInput";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    showPassword,
    setShowPassword,
    input,
    errors,
    register,
    isSubmitted,
  } = useInput({ name });

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
            : isSubmitted && input?.length !== 0 && "border-green-500"
        }
        `}
      >
        {type === "password" ? (
          <>
            <input
              type={showPassword ? "password" : "text"}
              {...register(name, registerOptions)}
              className="outline-none placeholder:text-gray-400 bg-transparent w-full px-2 py-2   mr-14 "
              placeholder={placeholder}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 cursor-pointer "
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
            <div className="absolute right-7 cursor-pointer">
              {errors[name] ? (
                <BiErrorCircle className="text-red-600 text-xl" />
              ) : (
                isSubmitted &&
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
              className="input"
              placeholder={placeholder}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 cursor-pointer"
            >
              {errors[name] ? (
                <BiErrorCircle className="text-red-600 text-xl" />
              ) : (
                isSubmitted &&
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
