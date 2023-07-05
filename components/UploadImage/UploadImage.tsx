import { AiOutlineCamera } from "react-icons/ai";
import useUploadImage from "./useUploadImage";

const UploadImage = () => {
  const {
    v,
    register,
    isSubmitted,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileUploaded,
    image,
  } = useUploadImage();

  return (
    <div>
      <div
        {...getRootProps()}
        className={`w-full rounded-m flex items-center gap-3 justify-between px-3 py-5 my-2 rounded-md
     
        ${
          !isFileUploaded
            ? isSubmitted
              ? "border border-red-600"
              : "border border-gray-600"
            : "border  border-gray-600"
        }`}
      >
        <input
          {...getInputProps()}
          {...register("img", {
            required: {
              value: !isFileUploaded,
              message: "this field is required",
            },
          })}
        />

        <div className="flex items-center md:w-80">
          <AiOutlineCamera className="text-2xl mr-2 min-w-[30px]" />

          {isDragAccept && <p>{v("upload")}</p>}
          {isDragReject && <p>{v("This file not supported")}</p>}
          {!isDragActive && (
            <>
              <p className="md:hidden">{v("Upload image")} </p>
              <p className="hidden md:block">
                {v("Drag & drop your image here or")}
              </p>
            </>
          )}
        </div>

        <div className="h-10">
          {image && (
            <img
              src={URL.createObjectURL(image[0])}
              className="h-full w-full max-h-[50px] max-w-[80px] object-cover"
            />
          )}
        </div>

        <label
          htmlFor="file"
          className="px-2 py-1 bg-purple-900 cursor-pointer rounded-sm"
        >
          {v("Choose file")}
        </label>
      </div>

      <div className="h-5">
        {!isFileUploaded && isSubmitted && (
          <p className="text-sm text-red-500 ml-3 text-left">
            {v("This field is required")}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
