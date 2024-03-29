import type { Genre, Movie } from "global";
import { ErrorText, ProfilePic, UploadImage } from "@/components";
import useAddQuote from "./useAddQuote";
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
    isLoading,
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
              <h2 className="text-orange-200  break-all">
                {movie && movie?.title[`${locale}`].length < 20
                  ? movie?.title[`${locale}`]
                  : movie?.title[`${locale}`].substring(0, 20) +
                    "..." +
                    " " +
                    `(${movie?.date?.slice(0, 4)})`}
              </h2>

              <div className="flex gap-2">
                {movie?.genres?.map((genre: Genre) => {
                  return (
                    <h4
                      className=" px-3 py-1 bg-gray-500 text-white w-fit rounded-sm cursor-pointer text-sm"
                      key={genre.value}
                    >
                      {genre.label[`${locale}`]}
                    </h4>
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
            className={`relative w-full flex  border rounded-md my-2  mt-6  ${
              errors.quote_en ? "border-red-600" : "border-gray-600"
            }  `}
          >
            <p className="absolute right-2 top-1 text-gray-400">Eng</p>

            <textarea
              className="outline-none bg-transparent placeholder:italic p-2 w-11/12 "
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
            className={`relative w-full flex  border rounded-md my-2  ${
              errors.quote_ka ? "border-red-600" : "border-gray-600"
            }`}
          >
            <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

            <textarea
              className="w-11/12 outline-none bg-transparent placeholder:italic p-2 "
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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-1 mt-3 rounded-md ${
              isLoading ? "bg-red-300" : "bg-red-600"
            }`}
          >
            {t("Add quote")}
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddQuote;
