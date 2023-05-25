import React from "react";
import { FormProvider } from "react-hook-form";
import useCreateMovieModal from "./useCreateMovieModal";
import { AiOutlineCamera } from "react-icons/ai";

const CreateMovieModal = () => {
  const { handleSubmit, register, submitForm, form } = useCreateMovieModal();
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full text-center  h-screen md:h-[90vh]"
      >
        <h2 className="py-5 border-b border-gray-600 text-xl">add movie</h2>

        <div className="p-5">
          <div className="flex items-center gap-2  mb-7">
            <img
              src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
              alt="profile"
              className="aspect-square w-10 h-10 object-cover rounded-full "
            />
            <p>Nino Tabagari</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative w-full flex  border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>
              <input
                type="text"
                className="w-full px-3 py-1 outline-none bg-transparent "
                placeholder="Movie name"
                {...register("movieNameEn", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />

              <div className="w-16"></div>
            </div>

            <div className="relative w-full flex  border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>
              <input
                type="text"
                className="w-full px-3 py-1 outline-none bg-transparent "
                placeholder="ფილმის სახელი"
                {...register("movieNameKa", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />

              <div className="w-16"></div>
            </div>

            <div className="relative w-full flex  border border-gray-600 rounded-md overflow-hidden">
              <div className="h-7"></div>
              <div className="w-16"></div>
            </div>

            <div className="relative w-full flex  border border-gray-600 rounded-md overflow-hidden">
              <input
                type="date"
                className="w-full px-3 py-1 outline-none bg-transparent "
                placeholder="წელი/year"
                {...register("year", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />
            </div>

            <div className="relative w-full flex  border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>
              <input
                type="text"
                className="w-full px-3 py-1 outline-none bg-transparent "
                placeholder="Director"
                {...register("directorEn", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />

              <div className="w-16"></div>
            </div>

            <div className="relative w-full flex  border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>
              <input
                type="text"
                className="w-full px-3 py-1 outline-none bg-transparent "
                placeholder="რეჟისორი"
                {...register("directorKa", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />

              <div className="w-16"></div>
            </div>

            <div className="relative w-full  border border-gray-600 rounded-md">
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="Movie discription"
                {...register("descEn", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div className="relative w-full  border border-gray-600 rounded-md">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="ფილმის აღწერა"
                {...register("descKa", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div className="w-full border border-gray-600 rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md">
              <AiOutlineCamera className="text-xl min-w-[30px]" />
              <p>Drag & drop your image here or</p>
              <label
                htmlFor="file"
                className="px-2 py-1 bg-purple-900 cursor-pointer"
              >
                Choose file
              </label>
              <input id="file" type="file" className="hidden" />
            </div>

            <button
              className="w-full bg-red-600 p-1 rounded-md"
              {...register("image", {
                required: "ამ ველის შევსება სავალდებულოა",
              })}
            >
              Add movie
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateMovieModal;
