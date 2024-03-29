import {
  CheckMark,
  DashboaradPortal,
  EmailCheckIcon,
  ExpiredIcon,
  ForgotPassword,
  Header,
  LandingQuote,
  LoginModal,
  NotificationModal,
  Portal,
  RecoverPassword,
  RegisterModal,
} from "@/components";
import { GetServerSidePropsContext } from "next";
import { useLanding } from "@/hooks";
import Link from "next/link";

const Landing = () => {
  const {
    loginModal,
    registerModal,
    emailCheckModal,
    accountActivation,
    forgotPassword,
    forgotPasswordCheck,
    recoverPassword,
    emailChangeNotification,
    passwordChangeNotification,
    linkExpired,
    closeModal,
    t,
    n,
    l,
  } = useLanding();
  return (
    <div className="bg-gray-950   ">
      <Header />
      <Portal isOpen={loginModal} closeModal={closeModal}>
        <LoginModal />
      </Portal>
      <Portal isOpen={registerModal} closeModal={closeModal}>
        <RegisterModal />
      </Portal>
      <Portal isOpen={emailCheckModal} closeModal={closeModal}>
        <NotificationModal
          title={n("Thank you")}
          desc={n("Please check your email and follow")}
          link="/landing?modal=login"
          buttonText={n("Go to my email")}
          icon={<EmailCheckIcon />}
        />
      </Portal>
      <Portal isOpen={accountActivation} closeModal={closeModal}>
        <NotificationModal
          title={n("Thank you")}
          desc={n("Your account has been activated")}
          link="/landing?modal=login"
          buttonText={n("Go to my news feed")}
          icon={<CheckMark />}
        />
      </Portal>

      <Portal isOpen={forgotPassword} closeModal={closeModal}>
        <ForgotPassword />
      </Portal>

      <Portal isOpen={forgotPasswordCheck} closeModal={closeModal}>
        <NotificationModal
          title={n("Check your email")}
          desc={n("We have sent a password recover instructions to your email")}
          link="/landing?modal=login"
          buttonText={n("Go to my email")}
          icon={<EmailCheckIcon />}
        />
      </Portal>

      <Portal isOpen={recoverPassword} closeModal={closeModal}>
        <RecoverPassword />
      </Portal>

      <Portal isOpen={emailChangeNotification} closeModal={closeModal}>
        <NotificationModal
          title={n("Success")}
          desc={n("Your Email changed successfully")}
          link="/landing?modal=login"
          buttonText={n("Log in")}
          icon={<CheckMark />}
        />
      </Portal>

      <Portal isOpen={passwordChangeNotification} closeModal={closeModal}>
        <NotificationModal
          title={n("Success")}
          desc={n("Your Password changed successfully")}
          link="/landing?modal=login"
          buttonText={n("Log in")}
          icon={<CheckMark />}
        />
      </Portal>

      <Portal isOpen={linkExpired} closeModal={closeModal}>
        <NotificationModal
          title={n("Link expired")}
          desc={n("Login link has expired")}
          link="/landing?modal=login"
          buttonText={n("Request another link")}
          icon={<ExpiredIcon />}
        />
      </Portal>

      <div className="w-full h-[70vh] flex justify-center items-center flex-col gap-10 p-20 relative ">
        <h2 className="text-orange-200 text-4xl md:text-6xl md:leading-[80px] font-Helvetica  font-bold md:w-[700px] text-center">
          {t("Find any quote")}
        </h2>
        <Link href={"/landing?modal=register"}>
          <button className="px-5 py-2 bg-red-600 text-white rounded-md w-32">
            {t("Get started")}
          </button>
        </Link>
        <div className="w-full h-32 absolute bottom-[-125px] z-40 bg-gradient-to-t from-gray-900/0 via-gray-900/10 to-gray-950/70"></div>
      </div>

      <LandingQuote
        quote={l("You have to leave somethig behind to go forward")}
        movie={l("Interstellar, 2014")}
        image="bg-imageOne"
        fixed={false}
      />
      <LandingQuote
        quote={l(
          "I think we’re just gonna have to be secretly in love with earch other and leave it that"
        )}
        movie={l("The Royal Tenenbaums,2001")}
        image="bg-imageTwo"
      />
      <LandingQuote
        quote={l(
          "I think we’re just gonna have to be secretly in love with earch other and leave it that"
        )}
        movie={l("The Royal Tenenbaums,2001")}
        image="bg-imageThree"
      />

      <div className="w-full bg-background p-3 ">
        <p className="text-orange-200 pl-5"> © {l("All rights reserved")}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookieValue = req.cookies?.["user-email"];

  if (cookieValue) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      messages: (await import(`../../locales/${context.locale}/common.json`))
        .default,
    },
  };
};

export default Landing;
