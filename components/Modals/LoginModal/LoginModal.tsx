import { Input } from "@/components";
import { AiOutlineGoogle } from "react-icons/ai";
import { FormProvider } from "react-hook-form";
import useLoginModal from "./useLoginModal";

const LoginModal = () => {
  const { handleSubmit, register, submitForm, form } = useLoginModal();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full h-full  m-auto"
      >
        <h2 className="text-center text-2xl mb-2">Log in to your account</h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          Welcome back! Please enter your details.
        </p>
        <Input
          name="name"
          label="Name"
          required={true}
          placeholder="Enter your email"
          registerOptions={{
            required: "ამ ველის შევსება სავალდებულოა",
            minLength: { value: 3, message: "შეიყვანეთ მინიმუმ 3 სიმბოლო" },
          }}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          required={true}
          placeholder="Password"
          registerOptions={{ required: "ამ ველის შევსება სავალდებულოა" }}
        />
        {/* Remember me & Forger password */}
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <input {...register("remember")} type="checkbox" />
              <label htmlFor="">Rememer me</label>
            </div>
            <p className="text-blue-700 underline cursor-pointer">
              Forgot password
            </p>
          </div>
        </div>
        {/* Buttons */}
        <button className="px-5 py-2 bg-red-500 text-white rounded-md w-full mt-5">
          Sign in
        </button>
        <div className="px-5 py-2 bg-transparent text-white border border-white rounded-md w-full mt-5 flex justify-center items-center gap-3 cursor-pointer">
          <AiOutlineGoogle />
          Sign in with Google
        </div>
        <div className="mt-5 flex justify-center items-center gap-2  text-gray-500">
          <p>Don't have an account</p>
          <span className="text-blue-700 underline cursor-pointer">
            Sign up
          </span>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginModal;
