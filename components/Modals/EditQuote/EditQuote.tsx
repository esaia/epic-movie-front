import { Quote } from "global";
import { BsTrash3 } from "react-icons/bs";
import useEditQuote from "./useEditQuote";
import { ProfilePic } from "@/components";
import { AiOutlineCamera } from "react-icons/ai";
import { t } from "i18next";

const EditQuote = ({
  quote,
  closeModal,
  reFetchMovie,
}: {
  quote: Quote;
  closeModal: () => void;
  reFetchMovie: () => void;
}) => {
  const { v, t, user, handleSubmit, register, errors, submitForm } =
    useEditQuote(quote, closeModal, reFetchMovie);

  return (
    <form
      className="w-full text-center h-screen md:h-fit md:max-h-[90vh] "
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <BsTrash3 className="cursor-pointer" />
      </div>
      <h2 className="py-3 border-b border-gray-600 text-xl">
        {t("Edit quote")}
      </h2>

      <div className="p-5">
        <div className="flex items-center gap-2  ">
          <ProfilePic size="10" />

          <p>{user?.name}</p>
        </div>
      </div>
      <div className="m-5">
        <div
          className={`relative w-full  border rounded-md ${
            errors.quote_en ? "border-red-600" : "border-gray-600"
          }`}
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
      </div>

      <div className="m-5">
        <div className="relative w-full  border border-gray-600 rounded-md">
          <p className="absolute right-2 top-1 text-gray-400">ქარ</p>

          <textarea
            className="w-full outline-none bg-transparent placeholder:italic p-2 "
            placeholder="ციტატა..."
            {...register("quote_ka", {
              required: v("This field is required"),
            })}
          ></textarea>
        </div>

        <div className="relative w-full h-72">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${quote.img}`}
            alt="profile"
            className="w-full h-full object-cover my-7 "
          />

          <div className="bg-black/50 flex flex-col justify-center items-center gap-2 cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 rounded-md">
            <input
              type="file"
              id="quoteimage"
              className="hidden"
              {...register("img")}
            />
            <label htmlFor="quoteimage">Change Photo</label>
            <AiOutlineCamera className="text-xl min-w-[30px] cursor-pointer" />
          </div>
        </div>

        <button className="w-full py-1 bg-red-600 mt-5">Save changes</button>
      </div>
    </form>
  );
};

export default EditQuote;
