import type { Genre, Movie } from "global";
import { ErrorText, ProfilePic, UploadImage } from "@/components";
import useAddQuote from "./useAddQuote";
import { DevTool } from "@hookform/devtools";
import { FormProvider } from "react-hook-form";

const AddQuote = ({
  movie,
  closeModal,
}: {
  movie: Movie | undefined;
  closeModal: () => void;
}) => {
  const {
    user,
    locale,
    t,
    v,
    register,
    errors,
    handleSubmit,
    onSubmit,
    form,
    control,
  } = useAddQuote(movie, closeModal);

  return (
    <FormProvider {...form}>
      <div className="w-full text-center h-screen md:h-fit md:max-h-[90vh] ">
        <h2 className="py-3 border-b border-gray-600 text-xl">
          {t("Add quote")}
        </h2>

        <div className="p-5">
          <div className="flex items-center gap-2  ">
            <ProfilePic size="10" />

            <p>{user?.name}</p>
          </div>
        </div>

        <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 items-center text-sm h-28">
            <div className="flex-1 h-full">
              <img
                src={
                  movie &&
                  `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${movie.img}`
                }
                alt="profile"
                className="w-full h-full min-w-[100px] rounded-md object-cover"
              />
            </div>
            <div className="flex gap-3 flex-col flex-2  justify-center  items-start text-left">
              <h2 className="text-orange-200 ">
                {movie?.title[`${locale}`] +
                  " " +
                  `(${movie?.date?.slice(0, 4)})`}
              </h2>

              <div className="flex gap-2">
                {movie?.genre.map((genre: Genre) => {
                  return (
                    <p
                      className="px-3 py-1 bg-gray-500 text-white w-fit rounded-sm cursor-pointer text-sm"
                      key={genre.value}
                    >
                      {genre.label}
                    </p>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 ">
                <p className="text-gray-200 ">{t("director")}: </p>
                <p>{movie?.director[`${locale}`]}</p>
              </div>
            </div>
          </div>
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
              })}
            ></textarea>
          </div>
          <ErrorText errors={errors} name="quote_ka" />

          <UploadImage />

          <button type="submit" className="w-full py-1 bg-red-600 mt-3">
            {t("Add quote")}
          </button>
          <DevTool control={control} />
        </form>
      </div>
    </FormProvider>
  );
};

export default AddQuote;
