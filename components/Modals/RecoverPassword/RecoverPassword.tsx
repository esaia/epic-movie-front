import { Input } from "@/components";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useRecoverPassword from "./useRecoverPassword";

const RecoverPassword = () => {
  const { form, handleSubmit, submitForm, password, isLoading } =
    useRecoverPassword();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full h-full  m-auto"
      >
        <h2 className="text-center text-2xl mb-2">Create new password</h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          Your new password must be different from previous used passwords
        </p>

        <Input
          name="password"
          label="Password"
          type="password"
          required={true}
          placeholder="At least 8 & max.15 lower case characters"
          registerOptions={{
            required: "ამ ველის შევსება სავალდებულოა",
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

        <button
          className={`px-10 md:px-28 py-2  text-white rounded-md w-full mt-5 
          ${isLoading ? "bg-gray-600" : "bg-red-500"}`}
          disabled={isLoading}
        >
          Reset password
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

export default RecoverPassword;
