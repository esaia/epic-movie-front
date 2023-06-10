import { Input } from "@/components";
import { AiOutlineGoogle } from "react-icons/ai";
import { FormProvider } from "react-hook-form";
import useRegisterModal from "./useRegisterModal";
import Link from "next/link";

const RegisterModal = () => {
  const {
    handleSubmit,
    form,
    password,
    onSubmit,
    isLoading,
    errorMessage,
    t,
    v,
  } = useRegisterModal();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <h2 className="text-center text-3xl mb-2">{t("Create an account")}</h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          {t("Start your journey!")}
        </p>
        <Input
          name="name"
          label={t("name")}
          required={true}
          placeholder={t("At least 3 max 15 characters")}
          registerOptions={{
            required: v("This field is required"),
            minLength: { value: 3, message: v("Enter at least 3 characters") },
            maxLength: {
              value: 15,
              message: v("Enter a maximum of 15 characters"),
            },
            pattern: {
              value: /^[a-z]+$/,
              message: v("Enter lower case characters"),
            },
          }}
        />

        <Input
          name="email"
          label={t("Email")}
          required={true}
          placeholder={t("Enter your email")}
          registerOptions={{
            required: v("This field is required"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: v("Enter the email in the correct format"),
            },
          }}
        />

        <Input
          name="password"
          label={t("password")}
          type="password"
          required={true}
          placeholder={t("password")}
          registerOptions={{
            required: v("This field is required"),
            minLength: { value: 8, message: v("Enter at least 8 characters") },
            maxLength: {
              value: 15,
              message: v("Enter a maximum of 15 characters"),
            },
            pattern: {
              value: /^[a-z0-9]+$/,
              message: v("Enter a lower case character or number"),
            },
          }}
        />

        <Input
          name="password_confirmation"
          label={t("Confirm password")}
          type="password"
          required={true}
          placeholder={t("Confirm password")}
          registerOptions={{
            required: v("This field is required"),
            validate: (value: string) =>
              value === password || v("Password does not match"),
          }}
        />

        <div className="h-7">
          {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
        </div>

        <button
          className={`px-10 md:px-28 py-2  text-white rounded-md w-full mt-5  
          ${isLoading ? "bg-gray-600" : "bg-red-500"} `}
          disabled={isLoading}
        >
          {t("Get started")}
        </button>
        <div className="px-5 py-2 bg-transparent text-white border border-white rounded-md w-full mt-5 flex justify-center items-center gap-3 cursor-pointer">
          <AiOutlineGoogle />
          {t("Sign up with google")}
        </div>
        <div className="mt-5 flex justify-center items-center gap-2 text-gray-500">
          <p> {t("Already have an account")}</p>
          <Link href={"/landing?modal=login"}>
            <span className="text-blue-700 underline cursor-pointer">
              {t("Log in")}
            </span>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterModal;
