import { Input } from "@/components";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useRecoverPassword from "./useRecoverPassword";

const RecoverPassword = () => {
  const { form, handleSubmit, submitForm, password, isLoading, n, v } =
    useRecoverPassword();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full h-full  m-auto"
      >
        <h2 className="text-center text-2xl mb-2">
          {n("Create new password")}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          {n("Your new password must be different")}
        </p>

        <Input
          name="password"
          label={n("password")}
          type="password"
          required={true}
          placeholder={n("At least 3 max 15 characters")}
          registerOptions={{
            required: v("This field is required"),
            pattern: {
              value: /^[a-z0-9]+$/,
              message: v('"Enter a lower case character or number"'),
            },
          }}
        />

        <Input
          name="password_confirmation"
          label={n("Confirm password")}
          type="password"
          required={true}
          placeholder={n("Confirm password")}
          registerOptions={{
            required: v("This field is required"),
            validate: (value: string) =>
              value === password || v("Password does not match"),
          }}
        />

        <button
          className={`px-10 md:px-28 py-2  text-white rounded-md w-full mt-5 
          ${isLoading ? "bg-gray-600" : "bg-red-500"}`}
          disabled={isLoading}
        >
          {n("reset password")}
        </button>

        <Link href={"/landing?modal=login"}>
          <div className="flex justify-center items-center mt-5 gap-2 ">
            <AiOutlineArrowLeft />
            <p className="text-sm text-gray-500"> {n("back")}</p>
          </div>
        </Link>
      </form>
    </FormProvider>
  );
};

export default RecoverPassword;
