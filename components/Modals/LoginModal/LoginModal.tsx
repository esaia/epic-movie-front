import { Input } from "@/components";
import { AiOutlineGoogle } from "react-icons/ai";
import { FormProvider } from "react-hook-form";
import useLoginModal from "./useLoginModal";
import Link from "next/link";

const LoginModal = () => {
  const {
    handleSubmit,
    register,
    onSubmit,
    form,
    errorMessage,
    t,
    v,
    isLoading,
  } = useLoginModal();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-center text-3xl mb-2">
          {t("Log in to your account")}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          {t("Welcome back! Please enter your details")}
        </p>
        <Input
          name="email"
          label={t("name")}
          required={true}
          placeholder={t("Enter your email")}
          registerOptions={{
            required: v("This field is required"),
            minLength: { value: 3, message: v("Enter at least 3 characters") },
          }}
        />
        <Input
          name="password"
          label={t("password")}
          type="password"
          required={true}
          placeholder={t("password")}
          registerOptions={{ required: v("This field is required") }}
        />
        <div className="h-7">
          {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <input {...register("remember")} type="checkbox" />
              <label htmlFor="">{t("Rememer me")}</label>
            </div>
            <Link href="/landing?modal=forgot-password">
              <p className="text-blue-700 underline cursor-pointer">
                {t("Forgot password")}
              </p>
            </Link>
          </div>
        </div>
        <button
          className={`px-5 py-2 text-white rounded-md w-full mt-5  ${
            isLoading ? "bg-red-300" : "bg-red-600"
          } `}
        >
          {t("Sign in")}
        </button>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/redirect`}>
          <div className="px-5 py-2 bg-transparent text-white border border-white rounded-md w-full mt-5 flex justify-center items-center gap-3 cursor-pointer">
            <AiOutlineGoogle />
            {t("Sign in with google")}
          </div>
        </Link>
        <div className="mt-5 flex justify-center items-center gap-2  text-gray-500">
          <p> {t("Don't have an account")}</p>
          <Link href={"/landing?modal=register"}>
            <span className="text-blue-700 underline cursor-pointer">
              {t("Sign up")}
            </span>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginModal;
