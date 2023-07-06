import { useTranslations } from "next-intl";
import { useDropzone } from "react-dropzone";
import { useFormContext, useWatch } from "react-hook-form";

const useUploadImageVertical = () => {
  const { register, setValue, control } = useFormContext();
  const v = useTranslations("Validations");
  const image = useWatch({ control, name: "img" });

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
    image,
    v,
  };
};

export default useUploadImageVertical;
