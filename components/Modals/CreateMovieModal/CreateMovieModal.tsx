import React from "react";
import { FormProvider, Controller } from "react-hook-form";
import useCreateMovieModal from "./useCreateMovieModal";
import { AiOutlineCamera } from "react-icons/ai";
import Select from "react-select";
import { DashboardInput, ProfilePic } from "@/components";

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
  } = useCreateMovieModal();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-center  h-screen md:h-[90vh]"
      >
        <h2 className="py-5 border-b border-gray-600 text-xl">
          {t("Add movie")}
        </h2>

        <div className="p-5">
          <div className="flex items-center gap-2  mb-7">
            <ProfilePic size="10" />

            <p>{user?.name}</p>
          </div>

          <div className="flex flex-col gap-4">
            <DashboardInput
              name="title_en"
              lang="Eng"
              placeholder="Movie name"
              registerOptions={{
                required: true,
              }}
            />

            <DashboardInput
              name="title_ka"
              lang="ქარ"
              placeholder="ფილმის სახელი"
              registerOptions={{
                required: true,
              }}
            />

            <div
              className={`border rounded-md ${
                errors.genre ? "border-red-600" : "border-gray-600"
              }`}
            >
              <Controller
                name="genre"
                rules={{ required: "ამ ველის შევსება სავალდებულოა" }}
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
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />
            </div>

            <DashboardInput
              name="director_en"
              lang="Eng"
              placeholder="Director"
              registerOptions={{
                required: true,
              }}
            />

            <DashboardInput
              name="director_ka"
              lang="ქარ"
              placeholder="რეჟისორი"
              registerOptions={{
                required: true,
              }}
            />

            <div
              className={`relative w-full  border  rounded-md ${
                errors.description_en ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="Movie discription"
                {...register("description_en", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div
              className={`relative w-full  border  rounded-md ${
                errors.description_ka ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="ფილმის აღწერა"
                {...register("description_ka", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div
              className={`w-full border rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md
            ${errors.img ? "border-red-600" : "border-gray-600"}`}
            >
              <AiOutlineCamera className="text-xl min-w-[30px]" />
              <p>Drag & drop your image here or</p>
              <label
                htmlFor="file"
                className="px-2 py-1 bg-purple-900 cursor-pointer"
              >
                Choose file
              </label>
              <input
                id="file"
                type="file"
                className="hidden"
                {...register("img", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />
            </div>

            <button className="w-full bg-red-600 p-1 rounded-md">
              {t("Add movie")}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateMovieModal;
