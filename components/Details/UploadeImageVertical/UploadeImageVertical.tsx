import { Movie } from "global";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";

const UploadeImageVertical = ({ movie }: { movie: Movie | undefined }) => {
  const {
    register,
    formState: { isSubmitted },
    setValue,
  } = useFormContext();
  const [isFileUploaded, setisFileUploaded] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue("img", acceptedFiles);
      setisFileUploaded(true);
    } else {
      setisFileUploaded(false);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div className="p-3 rounded-md border  border-gray-600">
        <div {...getRootProps()} className="flex">
          <input {...getInputProps()} {...register("img")} />

          <div className="flex-1 h-28 ">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${movie?.img}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-2 flex-col justify-center items-center gap-2">
            <p className="text-orange-200">REPLACE PHOTO</p>

            <div className="flex items-center gap-1">
              <AiOutlineCamera className="text-xl min-w-[30px]" />
              {isDragAccept && <p>upload</p>}
              {isDragReject && <p>This file not supported</p>}
              {!isDragActive && (
                <>
                  <p className="md:hidden">Upload image </p>
                  <p className="hidden md:block">
                    Drag & drop your image here or
                  </p>
                </>
              )}
            </div>

            <label
              htmlFor="file"
              className="px-2 py-1 bg-purple-900 cursor-pointer rounded-sm"
            >
              Choose file
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadeImageVertical;
