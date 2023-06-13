import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const useUploadImageVertical = () => {
  const { register, setValue } = useFormContext();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue("img", acceptedFiles);
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

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    register,
  };
};

export default useUploadImageVertical;
