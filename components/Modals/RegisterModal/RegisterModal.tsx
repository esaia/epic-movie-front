import { Input } from "@/components";
import { AiOutlineGoogle } from "react-icons/ai";
import { FormProvider } from "react-hook-form";
import useRegisterModal from "./useRegisterModal";
import Link from "next/link";

const RegisterModal = () => {
  const { handleSubmit, form, password, onSubmit, isLoading, errorMessage } =
    useRegisterModal();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full  m-auto">
        <h2 className="text-center text-3xl mb-2">Create an account</h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          Start your journey!
        </p>
        <Input
          name="name"
          label="Name"
          required={true}
          placeholder="At least 3 & max.15 lower case characters"
          registerOptions={{
            required: "ამ ველის შევსება სავალდებულოა",
            minLength: { value: 3, message: "შეიყვანეთ მინიმუმ 3 სიმბოლო" },
            maxLength: { value: 15, message: "შეიყვანეთ მაქსიმუმ 15 სიმბოლო" },
            pattern: {
              value: /^[a-z]+$/,
              message: "შეიყვანეთ დაბალი რეგისტრის სიმბოლოები",
            },
          }}
        />

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

        <Input
          name="password"
          label="Password"
          type="password"
          required={true}
          placeholder="Password"
          registerOptions={{
            required: "ამ ველის შევსება სავალდებულოა",
            minLength: { value: 8, message: "შეიყვანეთ მინიმუმ 8 სიმბოლო" },
            maxLength: { value: 15, message: "შეიყვანეთ მაქსიმუმ 15 სიმბოლო" },
            pattern: {
              value: /^[a-z0-9]+$/,
              message: "შეიყვანეთ დაბალი რეგისტრის სიმბოლო ან რიცხვი",
            },
          }}
        />

        <Input
          name="password_confirmation"
          label="Confirm password"
          type="password"
          required={true}
          placeholder="Confirm password"
          registerOptions={{
            required: "ამ ველის შევსება სავალდებულოა",
            validate: (value: string) =>
              value === password || "პაროლი არ ემთხვევა",
          }}
        />

        {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}

        <button
          className={`px-10 md:px-28 py-2  text-white rounded-md w-full mt-5  
          ${isLoading ? "bg-gray-600" : "bg-red-500"} `}
          disabled={isLoading}
        >
          Get started
        </button>
        <div className="px-5 py-2 bg-transparent text-white border border-white rounded-md w-full mt-5 flex justify-center items-center gap-3 cursor-pointer">
          <AiOutlineGoogle />
          Sign up with Google
        </div>
        <div className="mt-5 flex justify-center items-center gap-2 text-gray-500">
          <p>Already have an account?</p>
          <Link href={"/landing?modal=login"}>
            <span className="text-blue-700 underline cursor-pointer">
              Log in
            </span>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterModal;
