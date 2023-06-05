import { DashboardWrapper, Input, ProfilePic } from "@/components";
import { FormProvider } from "react-hook-form";
import useProfile from "./useProfile";

const index = () => {
  const {
    form,
    handleSubmit,
    user,
    password,
    updateUser,
    usernameEditFn,
    passwordEditFn,
    editUsername,
    register,
    editPassword,
    img,
    errorMsg,
  } = useProfile();

  return (
    <FormProvider {...form}>
      <DashboardWrapper>
        <h1 className="mb-16 mx-3 ">My profile</h1>

        <div className="bg-black/40 rounded-md mt-5 px-5 w-full  flex flex-col items-center  ">
          <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
            <div className="mb-4 top-[-40px] mt-[-40px] ">
              <ProfilePic size="32" />
            </div>

            {!user?.google_id && (
              <label className="cursor-pointer" htmlFor="profile">
                Upload new photo
              </label>
            )}

            <input
              {...register("img")}
              type="file"
              className="hidden"
              id="profile"
            />
          </form>

          <div className=" w-full max-w-md mt-3 p-2">
            <p>Username</p>
            <div className="flex  gap-1 items-center mt-2 mb-8">
              <div className="bg-gray-200 text-black rounded-sm w-full p-2 max-w-sm ">
                {user?.name}
              </div>

              <button className="w-16" onClick={usernameEditFn}>
                Edit
              </button>
            </div>

            {editUsername && (
              <>
                <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                  <div className="flex  gap-1 items-center mt-2 ">
                    <Input
                      name="name"
                      label="New username"
                      placeholder="Enter new usargame"
                      registerOptions={{
                        required: "ამ ველის შევსება სავალდებულოა",
                        minLength: {
                          value: 3,
                          message: "შეიყვანეთ მინიმუმ 3 სიმბოლო",
                        },
                        maxLength: {
                          value: 15,
                          message: "შეიყვანეთ მაქსიმუმ 15 სიმბოლო",
                        },
                        pattern: {
                          value: /^[a-z]+$/,
                          message: "შეიყვანეთ დაბალი რეგისტრის სიმბოლოები",
                        },
                      }}
                    />

                    <div className="w-16"></div>
                  </div>
                  <p className="mb-3 text-red-400">{errorMsg}</p>
                </form>
              </>
            )}

            <p>Email</p>
            <div className="flex  gap-1 items-center mt-2 mb-8">
              <div className="bg-gray-200 text-black rounded-sm w-full p-2 max-w-sm ">
                {user?.email}
              </div>
              <div className="w-16"></div>
            </div>

            {!user?.google_id && (
              <>
                <p>Password</p>
                <div className="flex  gap-1 items-center mt-2 mb-8">
                  <div className="bg-gray-200 text-black rounded-sm w-full p-2 max-w-sm ">
                    ••••••••••••
                  </div>

                  <button className="w-16" onClick={passwordEditFn}>
                    Edit
                  </button>
                </div>
              </>
            )}

            {editPassword && (
              <>
                <div className="flex  gap-1 items-center mt-2 mb-8">
                  <div className=" rounded-sm w-full  max-w-sm ">
                    <div className="px-5 py-3 border border-gray-800 rounded-sm">
                      <p className="mb-4">Passwords should contain:</p>
                      <li className="text-gray-400">8 or more characters</li>
                      <li>15 lowercase character</li>
                    </div>
                  </div>

                  <button className="w-16"></button>
                </div>

                <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                  <div className="flex  gap-1 items-center mt-2 ">
                    <Input
                      name="password"
                      label="New password"
                      type="password"
                      placeholder="Password"
                      registerOptions={{
                        required: "ამ ველის შევსება სავალდებულოა",
                        minLength: {
                          value: 8,
                          message: "შეიყვანეთ მინიმუმ 8 სიმბოლო",
                        },
                        maxLength: {
                          value: 15,
                          message: "შეიყვანეთ მაქსიმუმ 15 სიმბოლო",
                        },
                        pattern: {
                          value: /^[a-z0-9]+$/,
                          message:
                            "შეიყვანეთ დაბალი რეგისტრის სიმბოლო ან რიცხვი",
                        },
                      }}
                    />
                    <button className="w-16"></button>
                  </div>

                  <div className="flex  gap-1 items-center mb-8">
                    <Input
                      name="password_confirmation"
                      label="Confirm new password"
                      type="password"
                      placeholder="Confirm new password"
                      registerOptions={{
                        required: "ამ ველის შევსება სავალდებულოა",
                        validate: (value: string) =>
                          value === password || "პაროლი არ ემთხვევა",
                      }}
                    />
                    <button className="w-16"></button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {(editUsername || editPassword || img) && (
          <div className="flex w-full items-center justify-end">
            <button className="px-4 py-2 bg-transparent  text-white rounded-md mt-5">
              Cancell
            </button>
            <button
              type="submit"
              form="updateUserFrom"
              className="px-4 py-2 bg-red-500  text-white rounded-md mt-5"
            >
              save chenges
            </button>
          </div>
        )}
      </DashboardWrapper>
    </FormProvider>
  );
};

export default index;
