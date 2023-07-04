import {
  DashboardWrapper,
  Input,
  ProfilePic,
  UpdateUserConfirmation,
} from "@/components";
import { FormProvider } from "react-hook-form";
import { useProfile } from "@/hooks";
import { GetStaticPropsContext } from "next";
import {
  AiFillCheckCircle,
  AiOutlineArrowLeft,
  AiOutlineClose,
} from "react-icons/ai";
import { ErrorMessage } from "@hookform/error-message";

const Profile = () => {
  const {
    form,
    handleSubmit,
    user,
    password,
    updateUser,
    usernameEditFn,
    emailEditFn,
    editEmail,
    passwordEditFn,
    editUsername,
    register,
    editPassword,
    img,
    errors,
    errorMsg,
    t,
    v,
    hideInputes,
    status,
    setStatus,
    showConfirmationModal,
    setShowConfirmationModal,
    showSuccessNotif,
    setshowSuccessNotif,
  } = useProfile();

  return (
    <FormProvider {...form}>
      <DashboardWrapper>
        <div className="md:hidden mx-[-2rem]">
          <AiOutlineArrowLeft
            onClick={() => setStatus("")}
            className="text-2xl cursor-pointer min-w-[20px] ml-7"
          />
          {!status && (
            <div className="bg-secondary flex justify-center flex-col items-center gap-2 mt-5 p-5 ">
              {showSuccessNotif && (
                <div className="absolute top-20 translate-x-[-50%] left-[50%] w-11/12 bg-green-100 flex items-center justify-between p-3">
                  <AiFillCheckCircle className="text-green-800 text-2xl" />
                  <p className="text-green-700">
                    {t("Changes updated succsessfully")}
                  </p>
                  <AiOutlineClose
                    onClick={() => setshowSuccessNotif(false)}
                    className="text-gray-600 text-2xl cursor-pointer"
                  />
                </div>
              )}

              <ProfilePic size="32" />
              {!user?.google_id && (
                <label className="cursor-pointer" htmlFor="profile">
                  {t("Upload new photo")}
                </label>
              )}
              <div className="px-4 w-full">
                <div className="border-b border-gray-600 py-3 w-full mb-3">
                  <p>{t("Username")}</p>
                  <div className="flex justify-between items-center">
                    <p>{user?.name}</p>
                    <button onClick={() => setStatus("EDITUSERNAME")}>
                      {t("Edit")}
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-600 py-3 w-full mb-3">
                  <p>{t("Email")}</p>
                  <div className="flex justify-between items-center">
                    <p>{user?.email}</p>
                    {!user?.google_id && (
                      <button onClick={() => setStatus("EDITEMAIL")}>
                        {t("Edit")}
                      </button>
                    )}
                  </div>
                </div>

                <div className="border-b border-gray-600 py-3 w-full mb-3">
                  <p>{t("Password")}</p>
                  <div className="flex justify-between items-center">
                    <p>••••••••••••</p>
                    {!user?.google_id && (
                      <button onClick={() => setStatus("EDITPASSWORD")}>
                        {t("Edit")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === "EDITEMAIL" && (
            <div className="">
              <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                {showConfirmationModal && (
                  <UpdateUserConfirmation
                    setShowConfirmationModal={setShowConfirmationModal}
                  />
                )}

                <div className="bg-secondary p-10 mt-7">
                  <div className="flex flex-col gap-2">
                    <Input
                      name="email"
                      label={t("New email")}
                      placeholder={t("Enter new email")}
                      registerOptions={{
                        required: v("This field is required"),
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                          message: v("Enter the email in the correct format"),
                        },
                      }}
                    />
                  </div>

                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <p className="text-sm mt-2 text-red-500 ml-3">
                        {message}
                      </p>
                    )}
                  />
                </div>

                <div className="flex justify-between items-center px-10 py-6">
                  <div className="cursor-pointer" onClick={() => setStatus("")}>
                    {t("cancel")}
                  </div>
                  <div
                    onClick={() => setShowConfirmationModal(true)}
                    className="bg-red-500 flex items-center justify-center cursor-pointer w-40 px-4 py-2 rounded-md"
                  >
                    {t("Edit")}
                  </div>
                </div>
              </form>
            </div>
          )}

          {status === "EDITUSERNAME" && (
            <div className="">
              <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                {showConfirmationModal && (
                  <UpdateUserConfirmation
                    setShowConfirmationModal={setShowConfirmationModal}
                  />
                )}

                <div className="bg-secondary p-10 mt-7">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">{t("Enter new usarname")}</label>
                    <input
                      type="text"
                      className="p-2 bg-gray-300 rounded-md text-black outline-none"
                      {...register("name", {
                        required: v("This field is required"),
                        minLength: {
                          value: 3,
                          message: v("Enter at least 3 characters"),
                        },
                        maxLength: {
                          value: 15,
                          message: v("Enter a maximum of 15 characters"),
                        },
                        pattern: {
                          value: /^[a-z]+$/,
                          message: v("Enter lower case characters"),
                        },
                      })}
                    />
                  </div>

                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <p className="text-sm mt-2 text-red-500 ml-3">
                        {message}
                      </p>
                    )}
                  />
                </div>

                <div className="flex justify-between items-center px-10 py-6">
                  <div className="cursor-pointer" onClick={() => setStatus("")}>
                    {t("cancel")}
                  </div>
                  <div
                    onClick={() => setShowConfirmationModal(true)}
                    className="bg-red-500 flex items-center justify-center cursor-pointer w-40 px-4 py-2 rounded-md"
                  >
                    {t("Edit")}
                  </div>
                </div>
              </form>
            </div>
          )}

          {status === "EDITPASSWORD" && (
            <div className="">
              <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                {showConfirmationModal && (
                  <UpdateUserConfirmation
                    setShowConfirmationModal={setShowConfirmationModal}
                  />
                )}

                <div className="bg-secondary p-10 mt-7">
                  <div className="flex flex-col gap-2">
                    <label htmlFor=""> {t("New password")}</label>
                    <input
                      type="password"
                      className="p-2 bg-gray-300 rounded-md text-black outline-none"
                      {...register("password", {
                        required: v("This field is required"),
                        minLength: {
                          value: 8,
                          message: v("Enter at least 8 characters"),
                        },
                        maxLength: {
                          value: 15,
                          message: v("Enter a maximum of 15 characters"),
                        },
                        pattern: {
                          value: /^[a-z0-9]+$/,
                          message: v("Enter a lower case character or number"),
                        },
                      })}
                    />
                  </div>

                  <div className="h-9 mt-4">
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <p className="text-sm  text-red-500 ">{message}</p>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="">{t("Confirm new password")}</label>
                    <input
                      type="password"
                      className="p-2 bg-gray-300 rounded-md text-black outline-none"
                      {...register("password_confirmation", {
                        required: v("This field is required"),
                        validate: (value: string) =>
                          value === password || v("Password does not match"),
                      })}
                    />
                  </div>

                  <div className="h-9 mt-4">
                    <ErrorMessage
                      errors={errors}
                      name="password_confirmation"
                      render={({ message }) => (
                        <p className="text-sm  text-red-500 ">{message}</p>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center px-10 py-6">
                  <div className="cursor-pointer" onClick={() => setStatus("")}>
                    {t("cancel")}
                  </div>
                  <div
                    onClick={() => setShowConfirmationModal(true)}
                    className="bg-red-500 flex items-center justify-center cursor-pointer w-40 px-4 py-2 rounded-md"
                  >
                    {t("Edit")}
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="md:block hidden">
          <h1 className="mb-16 mx-3 ">{t("My profile")}</h1>

          <div className="bg-black/40 rounded-md mt-5 px-8 w-full  flex flex-col items-center  ">
            <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
              <div className="flex justify-center items-center flex-col">
                <div className="mb-4 top-[-40px] mt-[-40px] ">
                  <ProfilePic size="32" />
                </div>

                {!user?.google_id && (
                  <label className="cursor-pointer" htmlFor="profile">
                    {t("Upload new photo")}
                  </label>
                )}
              </div>

              <input
                {...register("img")}
                type="file"
                className="hidden"
                id="profile"
              />
            </form>

            <div className=" w-full max-w-xl mt-3 p-2  ">
              <p> {t("Username")}</p>
              <div className="mt-2 mb-8 w-full flex items-center gap-2">
                <div className="bg-gray-200 text-black rounded-sm w-full p-2 ">
                  {user?.name}
                </div>
                <div className="w-36">
                  <button onClick={usernameEditFn}>
                    {editUsername ? t("cancel") : t("Edit")}
                  </button>
                </div>
              </div>

              {editUsername && (
                <>
                  <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                    <div className="mt-2 flex items-center gap-2 ">
                      <Input
                        name="name"
                        label={t("New username")}
                        placeholder={t("Enter new usarname")}
                        registerOptions={{
                          required: v("This field is required"),
                          minLength: {
                            value: 3,
                            message: v("Enter at least 3 characters"),
                          },
                          maxLength: {
                            value: 15,
                            message: v("Enter a maximum of 15 characters"),
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9!@#$%^&*()-=_+~`[\]{}|;:'",.<>/?\s]*$/,
                            message: v("Enter lower case characters"),
                          },
                        }}
                      />
                      <div className="w-36"></div>
                    </div>

                    <p className="mb-3 text-red-400">{errorMsg}</p>
                  </form>
                </>
              )}

              <p> {t("Email")}</p>

              <div className="mt-3 mb-8 flex items-center gap-2">
                <div className="bg-gray-200 text-black rounded-sm w-full p-2 ">
                  {user?.email}
                </div>
                <div className="w-36">
                  {!user?.google_id && (
                    <button onClick={emailEditFn}>
                      {editEmail ? t("cancel") : t("Edit")}
                    </button>
                  )}
                </div>
              </div>

              {editEmail && (
                <>
                  <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                    <div className="mt-2 flex items-center gap-2 ">
                      <Input
                        name="email"
                        label={t("New email")}
                        placeholder={t("Enter new email")}
                        registerOptions={{
                          required: v("This field is required"),
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            message: v("Enter the email in the correct format"),
                          },
                        }}
                      />
                      <div className="w-36"></div>
                    </div>
                  </form>
                </>
              )}

              {!user?.google_id && (
                <>
                  <p> {t("Password")}</p>

                  <div className=" mt-2 mb-8 flex items-center gap-2 ">
                    <div className="bg-gray-200 text-black rounded-sm w-full p-2">
                      ••••••••••••
                    </div>

                    <div className="w-36">
                      <button onClick={passwordEditFn}>
                        {editPassword ? t("cancel") : t("Edit")}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {editPassword && (
                <>
                  <div className="mt-2 mb-8 flex items-center gap-2">
                    <div className=" rounded-sm w-full  ">
                      <div className="px-5 py-3 border border-gray-800 rounded-sm">
                        <p className="mb-4"> {t("Passwords should contain")}</p>
                        <li className="text-gray-400">
                          {t("8 or more characters")}
                        </li>
                        <li> {t("15 lowercase character")}</li>
                      </div>
                    </div>

                    <button className="w-36"></button>
                  </div>

                  <form id="updateUserFrom" onSubmit={handleSubmit(updateUser)}>
                    <div className="flex  gap-1 items-center mt-2">
                      <Input
                        name="password"
                        label={t("New password")}
                        type="password"
                        placeholder={t("New password")}
                        registerOptions={{
                          required: v("This field is required"),
                          minLength: {
                            value: 8,
                            message: v("Enter at least 8 characters"),
                          },
                          maxLength: {
                            value: 15,
                            message: v("Enter a maximum of 15 characters"),
                          },
                          pattern: {
                            value: /^[a-z0-9]+$/,
                            message: v(
                              "Enter a lower case character or number"
                            ),
                          },
                        }}
                      />
                      <button className="w-36"></button>
                    </div>

                    <div className="flex  gap-1 items-center mb-8 ">
                      <Input
                        name="password_confirmation"
                        label={t("Confirm new password")}
                        type="password"
                        placeholder={t("Confirm new password")}
                        registerOptions={{
                          required: v("This field is required"),
                          validate: (value: string) =>
                            value === password || v("Password does not match"),
                        }}
                      />
                      <button className="w-36"></button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {(editUsername || editEmail || editPassword || img) && (
            <div className="flex w-full items-center justify-end">
              <button
                onClick={hideInputes}
                className="px-4 py-2 bg-transparent  text-white rounded-md mt-5"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                form="updateUserFrom"
                className="px-2 py-2 w-48 bg-red-500  text-white rounded-md mt-5"
              >
                {t("save changes")}
              </button>
            </div>
          )}
        </div>
      </DashboardWrapper>
    </FormProvider>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../locales/${context.locale}/common.json`))
        .default,
    },
  };
}

export default Profile;
