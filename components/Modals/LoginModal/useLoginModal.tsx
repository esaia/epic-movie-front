import axios from "axios";
import axiosAPI from "lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface loginDataType {
  email: string;
  password: string;
  remember?: boolean;
}

const useLoginModal = () => {
  const form = useForm<loginDataType>();
  const { handleSubmit, register, control } = form;
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const loginUser = (user: loginDataType) => {
    return axiosAPI.post("/login", user);
  };

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      setErrorMessage("Unauthorized. Please check your credentials.");
    },
  });

  const onSubmit: SubmitHandler<loginDataType> = (user) => {
    const fetch = async () => {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        headers: { Accept: "application/json" },
        withCredentials: true,
      });
    };
    fetch();

    return mutate(user);
  };

  return { handleSubmit, register, onSubmit, form, control, errorMessage };
};

export default useLoginModal;
