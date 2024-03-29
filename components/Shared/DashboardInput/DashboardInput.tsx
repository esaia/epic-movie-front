import React from "react";
import { useFormContext } from "react-hook-form";
import { inputProps } from "./types";
import { ErrorText } from "@/components";

const DashboardInput = ({
  name,
  lang,
  placeholder = "",
  registerOptions,
  prefix = "",
}: inputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div
        className={`relative w-full flex items-center  border 0 rounded-md overflow-hidden ${
          errors[name] ? "border-red-600" : "border-gray-600"
        }`}
      >
        <p className="absolute right-2 top-1 text-gray-400">{lang}</p>

        {prefix && (
          <p className="text-xs text-gray-400 pl-2 text-left w-fit whitespace-nowrap">
            {prefix}:{" "}
          </p>
        )}

        <input
          type="text"
          className="w-full px-3 py-1 outline-none bg-transparent"
          placeholder={placeholder}
          {...register(name, registerOptions)}
        />

        <div className="w-16"></div>
      </div>

      <ErrorText errors={errors} name={name} />
    </>
  );
};

export default DashboardInput;
