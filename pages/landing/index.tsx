import {
  EmailCheckModal,
  Header,
  LandingQuote,
  LoginModal,
  Portal,
  RegisterModal,
} from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Landing = () => {
  const router = useRouter();
  const [loginModal, setloginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [emailCheckModal, setEmailCheckModal] = useState<boolean>(false);

  const closeModal = () => {
    router.push("/landing");
    // setloginModal(false);
  };

  useEffect(() => {
    if (router.query.modal === "login") {
      setloginModal(true);
    } else if (router.query.modal === "register") {
      setRegisterModal(true);
    } else if (router.query.modal === "emailcheck") {
      setEmailCheckModal(true);
    } else {
      setloginModal(false);
      setRegisterModal(false);
      setEmailCheckModal(false);
    }
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
        <EmailCheckModal />
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
