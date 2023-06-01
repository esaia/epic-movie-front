import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

const useLanding = () => {
  const router = useRouter();
  const [loginModal, setloginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [emailCheckModal, setEmailCheckModal] = useState<boolean>(false);
  const [accountActivation, setAccountActivation] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [forgotPasswordCheck, setForgotPasswordCheck] =
    useState<boolean>(false);
  const [recoverPassword, setRecoverPassword] = useState<boolean>(false);
  const [emailChangeNotification, setEmailChangeNotification] =
    useState<boolean>(false);

  const [passwordChangeNotification, setPasswordChangeNotification] =
    useState<boolean>(false);

  const [linkExpired, setlinkExpired] = useState<boolean>(false);

  const closeModal = () => {
    router.push("/landing");
  };

  useEffect(() => {
    const { modal } = router.query;

    setloginModal(modal === "login");
    setRegisterModal(modal === "register");
    setEmailCheckModal(modal === "emailcheck");
    setAccountActivation(modal === "account-activation");
    setForgotPassword(modal === "forgot-password");
    setForgotPasswordCheck(modal === "forgot-password-check");
    setRecoverPassword(modal === "recover-password");
    setEmailChangeNotification(modal === "email-change-notification");
    setPasswordChangeNotification(modal === "password-change-notification");
    setlinkExpired(modal === "expired");
  }, [router]);

  return {
    loginModal,
    registerModal,
    emailCheckModal,
    accountActivation,
    forgotPassword,
    forgotPasswordCheck,
    recoverPassword,
    emailChangeNotification,
    passwordChangeNotification,
    closeModal,
    linkExpired,
  };
};

export default useLanding;
