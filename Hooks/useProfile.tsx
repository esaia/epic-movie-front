import { AuthContext } from "context/AuthContext";
import { useContext, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { profileInputType } from "global";
import { useTranslations } from "next-intl";
import { updateUserRequest } from "lib/index";
import { useMutation } from "react-query";

const useProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const t = useTranslations("Profile");
  const v = useTranslations("Validations");

  const [status, setStatus] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessNotif, setshowSuccessNotif] = useState(false);

  const [editUsername, seteditUsername] = useState(false);
  const [editEmail, seteditEmail] = useState(false);
  const [editPassword, seteditPassword] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const form = useForm<profileInputType>();

  const {
    resetField,
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const img = useWatch({
    control,
    name: "img",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const { mutate } = useMutation({
    mutationFn: (formdata: FormData) => updateUserRequest(formdata, user?.id),
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    },
  });

  const updateUser: SubmitHandler<profileInputType> = (data) => {
    let inputes = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );

    const formData = new FormData();

    if (inputes.img.length === 0) {
      delete inputes.img;
    } else {
      formData.append("img", inputes.img[0]);
    }

    for (const key in inputes) {
      if (inputes.hasOwnProperty(key)) {
        formData.append(key, inputes[key]);
      }
    }

    const update = async () => {
      try {
        mutate(formData);
        seteditUsername(false);
        seteditEmail(false);
        seteditPassword(false);
        setshowSuccessNotif(true);
        setShowConfirmationModal(false);
        setStatus("");
        resetFields();
      } catch (error) {
        seterrorMsg("user already exists");
        console.error(error);
      }
    };

    update();
  };

  const resetFields = () => {
    resetField("password");
    resetField("password_confirmation");
    resetField("email");
    resetField("name");
  };
  const usernameEditFn = () => {
    seteditPassword(false);
    seteditEmail(false);
    seteditUsername(!editUsername);
    resetFields();
  };
  const emailEditFn = () => {
    seteditPassword(false);
    seteditUsername(false);
    seteditEmail(!editEmail);
    resetFields();
  };
  const passwordEditFn = () => {
    seteditUsername(false);
    seteditEmail(false);
    seteditPassword(!editPassword);
    resetFields();
  };
  const hideInputes = () => {
    seteditUsername(false);
    seteditEmail(false);
    seteditPassword(false);
  };

  return {
    form,
    handleSubmit,
    user,
    password,
    updateUser,
    usernameEditFn,
    emailEditFn,
    passwordEditFn,
    editUsername,
    editEmail,
    register,
    editPassword,
    img,
    errors,
    errorMsg,
    t,
    v,
    hideInputes,
    status,
    setStatus,
    showConfirmationModal,
    setShowConfirmationModal,
    showSuccessNotif,
    setshowSuccessNotif,
  };
};

export default useProfile;
