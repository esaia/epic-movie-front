import { useTranslations } from "next-intl";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const useUploadImage = () => {
  const v = useTranslations("Validations");

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

  return {
    register,
    isSubmitted,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileUploaded,
    v,
  };
};

export default useUploadImage;
