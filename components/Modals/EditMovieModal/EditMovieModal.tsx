import { AiOutlineCamera } from "react-icons/ai";
import { Controller, FormProvider } from "react-hook-form";
import useEditMovieModal from "./useEditMovieModal";
import Select from "react-select";
import { DashboardInput, ErrorText, ProfilePic } from "@/components";
import { Movie } from "global";

const EditMovieModal = ({
  movie,
  closeModal,
}: {
  movie: Movie;
  closeModal: () => void;
}) => {
  const {
    user,
    handleSubmit,
    register,
    submitForm,
    form,
    errors,
    v,
    control,
    genres,
  } = useEditMovieModal(movie, closeModal);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full text-center h-screen md:h-[90vh]"
      >
        <h2 className="py-5 border-b border-gray-600 text-xl">Update Movie</h2>

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
              prefix="Movie name"
            />
            <DashboardInput
              name="title_ka"
              lang="ქარ"
              placeholder="ფილმის სახელი"
              registerOptions={{
                required: v("This field is required"),
              }}
              prefix="ფილმის სახელი"
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
              prefix="Director"
            />
            <DashboardInput
              name="director_ka"
              lang="ქარ"
              placeholder="რეჟისორი"
              registerOptions={{
                required: v("This field is required"),
              }}
              prefix="რეჟისორი"
            />
            <div
              className={`relative w-full  border  rounded-md flex  items-start ${
                errors.description_en ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>

              <p className="text-xs pl-2 pt-3">Discription: </p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="Movie discription"
                {...register("description_en", {
                  required: v("This field is required"),
                })}
              ></textarea>
            </div>
            <ErrorText errors={errors} name="description_en" />

            <div
              className={`relative w-full  border  rounded-md flex items-start ${
                errors.description_ka ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <p className="text-xs pl-2 pt-3 whitespace-nowrap">
                ფილმის აღწერა:
              </p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="ფილმის აღწერა"
                {...register("description_ka", {
                  required: v("This field is required"),
                })}
              ></textarea>
            </div>
            <ErrorText errors={errors} name="description_ka" />

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
                {...register("img")}
              />
            </div>

            <ErrorText errors={errors} name="img" />

            <button className="w-full bg-red-600 p-1 mt-5 rounded-md">
              Edit
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditMovieModal;
