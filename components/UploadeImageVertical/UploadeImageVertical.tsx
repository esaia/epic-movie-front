import { Movie } from "global";
import { AiOutlineCamera } from "react-icons/ai";
import useUploadImageVertical from "./useUploadImageVertical";

const UploadeImageVertical = ({ movie }: { movie: Movie | undefined }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    register,
    image,
    v,
  } = useUploadImageVertical();

  return (
    <div>
      <div className="p-3 rounded-md border  border-gray-600">
        <div {...getRootProps()} className="flex">
          <input {...getInputProps()} {...register("img")} />

          <div className="flex-1 h-28 ">
            <img
              src={
                image
                  ? URL.createObjectURL(image[0])
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${movie?.img}`
              }
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-2 flex-col justify-center items-center gap-2">
            <p className="text-orange-200 uppercase">{v("replace photo")}</p>

            <div className="flex items-center gap-1">
              <AiOutlineCamera className="text-xl min-w-[30px]" />
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

            <label
              htmlFor="file"
              className="px-2 py-1 bg-purple-900 cursor-pointer rounded-sm"
            >
              {v("Choose file")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadeImageVertical;
