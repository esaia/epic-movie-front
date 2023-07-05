import { ErrorText, ProfilePic, UploadImage } from "@/components";
import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCameraReels } from "react-icons/bs";
import useCreateQuoteModal from "./useCreateQuoteModal";
import { FormProvider } from "react-hook-form";

const CreateQuoteModal = () => {
  const {
    v,
    t,
    locale,
    user,
    handleSubmit,
    register,
    form,
    onSubmit,
    errors,
    showMovies,
    setShowMovies,
    movies,
    setMovieId,
    movieId,
    setErrorMessage,
    errorMessage,
  } = useCreateQuoteModal();

  return (
    <FormProvider {...form}>
      <div className="w-full text-center z-40">
        <h2 className="py-5 border-b border-gray-600 text-xl">
          {t("Write new quote")}
        </h2>

        <div className="p-5">
          <div className="flex items-center gap-2  mb-7">
            <ProfilePic size="12" />
            <h2 className="text-md ">{user?.name}</h2>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`relative w-full  border rounded-md my-2  mt-6  ${
                errors.quote_en ? "border-red-600" : "border-gray-600"
              }  `}
            >
              <p className="absolute right-2 top-1 text-gray-400">eng</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="quote..."
                {...register("quote_en", {
                  required: v("This field is required"),
                  pattern: {
                    value: /^[a-zA-Z0-9!@#$%^&*()-=_+~`[\]{}|;:'",.<>/?\s]*$/,
                    message: v("only English"),
                  },
                })}
              ></textarea>
            </div>
            <ErrorText errors={errors} name="quote_en" />
            <div
              className={`relative w-full  border rounded-md my-2  ${
                errors.quote_ka ? "border-red-600" : "border-gray-600"
              }`}
            >
              <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

              <textarea
                className="w-full outline-none bg-transparent placeholder:italic p-2 "
                placeholder="ციტატა..."
                {...register("quote_ka", {
                  required: v("This field is required"),
                  pattern: {
                    value: /^[ა-ჰ0-9!@#$%^&*()-=_+~`[\]{}|;:'",.<>/?\s]*$/,
                    message: v("only Georgia"),
                  },
                })}
              ></textarea>
            </div>
            <ErrorText errors={errors} name="quote_ka" />

            <UploadImage />

            <div
              onClick={() => setShowMovies(!showMovies)}
              className="w-full relative cursor-pointer  bg-black  rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <BsCameraReels className="text-2xl min-w-[10px] " />
                  <p>{t("Choose movie")}</p>
                </div>

                <p>
                  {movies &&
                    movies?.find((movie) => movie.id === movieId)?.title[
                      `${locale}`
                    ]}
                </p>

                <AiOutlineCaretDown className="text-white" />
              </div>
              {showMovies && (
                <div className="absolute w-full h-fit bg-background top-16 rounded-md left-0 overflow-hidden">
                  {movies &&
                    movies?.map((movie) => {
                      return (
                        <h2
                          key={movie.id}
                          onClick={() => {
                            setMovieId(movie.id);
                            setErrorMessage("");
                          }}
                          className="p-2 border border-gray-500 m-2 hover:bg-secondary  "
                        >
                          {movie.title[`${locale}`].length < 20
                            ? movie.title[`${locale}`]
                            : movie.title[`${locale}`].substring(0, 20) + "..."}
                        </h2>
                      );
                    })}
                </div>
              )}
            </div>

            <p className="text-sm text-left h-8 text-red-500 ml-3">
              {errorMessage}
            </p>

            <button
              type="submit"
              className="w-full  bg-red-600 p-1 mt-5 rounded-md"
            >
              {t("Post")}
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateQuoteModal;
