import { Input } from "@/components";
import { FormProvider } from "react-hook-form";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
  const { form, handleSubmit, onSubmit, errorMessage, isLoading } =
    useForgotPassword();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full  m-auto">
        <h2 className="text-center text-2xl mb-2">Forgot password?</h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          Enter the email and we’ll send an email with instructions to reset
          your password
        </p>

        <Input
          name="email"
          label="Email"
          required={true}
          placeholder="Enter your email"
          registerOptions={{
            required: "ამ ველის შევსება სავალდებულოა",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "ჩაწერეთ მეილი სწორი ფორმატით",
            },
          }}
        />

        {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className={`px-10 md:px-28 py-2  text-white rounded-md w-full mt-5 
                  ${isLoading ? "bg-gray-600" : "bg-red-500"} `}
          disabled={isLoading}
        >
          Send instructions
        </button>

        <Link href={"/landing?modal=login"}>
          <div className="flex justify-center items-center mt-5 gap-2 ">
            <AiOutlineArrowLeft />
            <p className="text-sm text-gray-500">Back to log in</p>
          </div>
        </Link>
      </form>
    </FormProvider>
  );
};

export default ForgotPassword;
