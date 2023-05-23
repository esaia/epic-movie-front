import {
  CheckMark,
  EmailCheckIcon,
  ForgotPassword,
  Header,
  LandingQuote,
  LoginModal,
  NotificationModal,
  Portal,
  RecoverPassword,
  RegisterModal,
} from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Landing = () => {
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
  }, [router]);

  return (
    <div className="bg-gray-950 h-screen overflow-y-scroll ">
      <Header />
      <Portal isOpen={loginModal} closeModal={closeModal}>
        <LoginModal />
      </Portal>
      <Portal isOpen={registerModal} closeModal={closeModal}>
        <RegisterModal />
      </Portal>
      <Portal isOpen={emailCheckModal} closeModal={closeModal}>
        <NotificationModal
          title="Thank you!"
          desc="Please check your email and follow the instructions to activate your account."
          link="/"
          buttonText="Go to my email"
          icon={<EmailCheckIcon />}
        />
      </Portal>
      <Portal isOpen={accountActivation} closeModal={closeModal}>
        <NotificationModal
          title="Thank you!"
          desc="Your account has been activated."
          link="/landing?modal=login"
          buttonText="Go to my news feed"
          icon={<CheckMark />}
        />
      </Portal>

      <Portal isOpen={forgotPassword} closeModal={closeModal}>
        <ForgotPassword />
      </Portal>

      <Portal isOpen={forgotPasswordCheck} closeModal={closeModal}>
        <NotificationModal
          title="Check your email"
          desc="We have sent a password recover instructions to your email"
          link="/"
          buttonText="Go to my email"
          icon={<EmailCheckIcon />}
        />
      </Portal>

      <Portal isOpen={recoverPassword} closeModal={closeModal}>
        <RecoverPassword />
      </Portal>

      <Portal isOpen={emailChangeNotification} closeModal={closeModal}>
        <NotificationModal
          title="Success!"
          desc="Your Email changed successfully"
          link="/landing?modal=login"
          buttonText="Log in"
          icon={<CheckMark />}
        />
      </Portal>

      <Portal isOpen={passwordChangeNotification} closeModal={closeModal}>
        <NotificationModal
          title="Success!"
          desc="Your Password changed successfully"
          link="/landing?modal=login"
          buttonText="Log in"
          icon={<CheckMark />}
        />
      </Portal>

      <div className="w-full h-[70vh] flex justify-center items-center flex-col gap-10 p-20  ">
        <h2 className="text-orange-200 text-4xl md:text-6xl md:leading-[80px] font-Helvetica  font-bold md:w-[700px] text-center">
          Find any quote in millions of movie lines
        </h2>
        <button className="px-5 py-2 bg-red-500 text-white rounded-md">
          Get started
        </button>
      </div>
      <LandingQuote
        quote="“You have to leave somethig behind to go forward”"
        movie="Interstellar, 2014"
        image="bg-imageOne"
      />
      <LandingQuote
        quote="I think we’re just gonna have to be secretly in love with earch other and leave it that"
        movie="The Royal Tenenbaums,2001 "
        image="bg-imageTwo"
      />
      <LandingQuote
        quote="I think we’re just gonna have to be secretly in love with earch otherand leave it that"
        movie="The Royal Tenenbaums,2001 "
        image="bg-imageThree"
      />
    </div>
  );
};

export default Landing;
