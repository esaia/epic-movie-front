import React from "react";
import { FormProvider, Controller } from "react-hook-form";
import useCreateMovieModal from "./useCreateMovieModal";
import Select from "react-select";
import {
  DashboardInput,
  ErrorText,
  ProfilePic,
  UploadImage,
} from "@/components";

const CreateMovieModal = () => {
  const {
    user,
    handleSubmit,
    register,
    form,
    genres,
    control,
    errors,
    onSubmit,
    t,
    v,
  } = useCreateMovieModal();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-center h-screen md:h-[90vh]"
      >
        <h2 className="py-5 border-b border-gray-600 text-xl">
          {t("Add movie")}
        </h2>

        <div className="p-5">
          <div className="flex items-center gap-2  mb-7">
            <ProfilePic size="10" />

            <p>{user?.name}</p>
          </div>

          <div className="flex flex-col gap-1">
            <DashboardInput
              name="title_en"
              lang="Eng"
              placeholder="Movie name"
              registerOptions={{
                required: v("This field is required"),
              }}
            />
            <DashboardInput
              name="title_ka"
              lang="ქარ"
              placeholder="ფილმის სახელი"
              registerOptions={{
                required: v("This field is required"),
              }}
            />
            <div
              className={`border rounded-md ${
                errors.genre ? "border-red-600" : "border-gray-600"
              }`}
            >
              <Controller
                name="genre"
                rules={{ required: v("This field is required") }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={genres?.data}
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                  />
                )}
              />
            </div>
            <ErrorText errors={errors} name="genre" />

            <div
              className={`relative w-full flex  border rounded-md overflow-hidden ${
                errors.date ? "border-red-600" : "border-gray-600"
              }`}
            >
              <input
                type="date"
                className="w-full px-3 py-1 outline-none bg-transparent text-white date-input "
                placeholder="წელი/year"
                {...register("date", {
                  required: v("This field is required"),
                })}
              />
            </div>
            <ErrorText errors={errors} name="date" />

            <DashboardInput
              name="director_en"
              lang="Eng"
              placeholder="Director"
              registerOptions={{
                required: v("This field is required"),
              }}
            />
            <DashboardInput
              name="director_ka"
              lang="ქარ"
              placeholder="რეჟისორი"
              registerOptions={{
                required: v("This field is required"),
              }}
            />
            <div
              className={`relative flex w-full  border  rounded-md ${
                errors.description_en ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 mr-12"
                placeholder="Movie discription"
                {...register("description_en", {
                  required: v("This field is required"),
                })}
              ></textarea>
            </div>
            <ErrorText errors={errors} name="description_en" />

            <div
              className={`relative flex w-full  border  rounded-md ${
                errors.description_ka ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 mr-12"
                placeholder="ფილმის აღწერა"
                {...register("description_ka", {
                  required: v("This field is required"),
                })}
              ></textarea>
            </div>
            <ErrorText errors={errors} name="description_ka" />

            <UploadImage />

            <button className="w-full bg-red-600 p-1 mt-5 rounded-md">
              {t("Add movie")}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateMovieModal;
