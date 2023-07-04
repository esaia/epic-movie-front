import { useTranslations } from "next-intl";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const useUploadImageVertical = () => {
  const { register, setValue } = useFormContext();
  const v = useTranslations("Validations");

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
    v,
  };
};

export default useUploadImageVertical;
