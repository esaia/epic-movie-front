import { AiOutlineCamera } from "react-icons/ai";
import { FormProvider } from "react-hook-form";
import useEditMovieModal from "./useEditMovieModal";
import Select from "react-select";
import { ProfilePic } from "components/ProfilePic";

const EditMovieModal = () => {
  const { handleSubmit, register, submitForm, form, colourOptions } =
    useEditMovieModal();
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full text-center h-screen md:h-[90vh] "
      >
        <h2 className="py-3 border-b border-gray-600 text-xl">Edit movie</h2>

        <div className="p-5">
          <div className="flex items-center gap-2  mb-7">
            <ProfilePic size="10" />

            <p>Nino Tabagari</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative w-full flex items-center border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>
              <label className="text-sm text-gray-500 min-w-fit pl-3  ">
                Movie name:
              </label>
              <input
                type="text"
                className="w-full  px-3 py-1 outline-none bg-transparent "
                placeholder="Movie name"
                {...register("movieNameEn", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />

              <div className="w-16"></div>
            </div>

            <div className="relative w-full flex border border-gray-600 rounded-md overflow-hidden items-center">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <label className="text-sm text-gray-500 min-w-fit pl-3  ">
                ფილმის სახელი:
              </label>
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

            <Select
              isMulti
              name="colors"
              options={colourOptions}
              className="my-react-select-container "
              classNamePrefix="my-react-select"
            />

            <div className="relative w-full flex  items-center  border border-gray-600 rounded-md overflow-hidden">
              <label className="text-sm text-gray-500 min-w-fit pl-3 ">
                Movie name:
              </label>
              <input
                type="date"
                className="w-full px-3 py-1 outline-none bg-transparent "
                placeholder="წელი/year"
                {...register("year", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              />
            </div>

            <div className="relative w-full flex  items-center  border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>
              <label className="text-sm text-gray-500 min-w-fit pl-3 ">
                Director:
              </label>
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

            <div className="relative w-full flex  items-center  border border-gray-600 rounded-md overflow-hidden">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>
              <label className="text-sm text-gray-500 min-w-fit pl-3 ">
                დირექტორი:
              </label>
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

            <div className="relative w-full flex py-2  border border-gray-600 rounded-md">
              <p className="absolute right-2 top-1 text-gray-400">Eng</p>

              <label className="text-sm text-gray-500 min-w-fit pl-3 ">
                description:
              </label>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic  pl-2  "
                placeholder="Movie discription"
                {...register("descEn", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div className="relative w-full flex py-2  border border-gray-600 rounded-md">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <label className="text-sm text-gray-500 min-w-fit pl-3 ">
                description:
              </label>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic  pl-2  "
                placeholder="ფილმის აღწერა"
                {...register("descKa", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div className="relative w-full flex py-2  border border-gray-600 rounded-md">
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <label className="text-sm text-gray-500 min-w-fit pl-3 ">
                description:
              </label>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic  pl-2  "
                placeholder="ფილმის აღწერა"
                {...register("descKa", {
                  required: "ამ ველის შევსება სავალდებულოა",
                })}
              ></textarea>
            </div>

            <div className="w-full border border-gray-600 rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md">
              <div className="flex-1">
                <img
                  src="https://media.istockphoto.com/id/1237804526/vector/movie-night-concept-with-popcorn-cinema-tickets-drink-tape-in-cartoon-style-movie-or-cinema.jpg?s=612x612&w=0&k=20&c=FWIp6SXBqUg-_PWtoTxOy00b2aeg5xNDiRcFr6IF4l4="
                  alt=""
                  className="rounded-sm h-20  object-cover w-full"
                />
              </div>
              <div className="flex flex-1  flex-col items-center gap-2">
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
            </div>

            <button className="w-full bg-red-600 p-1 rounded-md">
              Edit movie
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditMovieModal;
