import {
  DashboaradPortal,
  LanguageSwitcher,
  Notification,
  ProfilePic,
  ViewQuote,
} from "@/components";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";
import { RiArrowUpSFill } from "react-icons/ri";
import useNewsFeedHeader from "./useNewsFeedHeader";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import { BsCameraReels, BsHouseDoor } from "react-icons/bs";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { notification } from "global";

const NewsFeedHeader = () => {
  const {
    showNotification,
    handleToggleNotification,
    logout,
    handleClickOutside,
    t,
    router,
    user,
    showMobileMenu,
    asPath,
    setshowMobileMenu,
    notifications,
    seenNotification,
    notificationTotalNumber,
    showNotificationMobile,
    handleClickOutsideNotificationMobile,
    markNotificationAsRead,
    showViewQuoteModal,
    setShowViewQuoteModal,
    closeModal,
    notificationNumber,
    setNotificationNumber,
    showMobileSearch,
    setshowMobileSearch,
    handleSubmit,
    register,
    onSubmit,
  } = useNewsFeedHeader();

  return (
    <div className=" max-w-[1920px] left-[50%] translate-x-[-50%] h-16 bg-secondary py-5 px-8 flex justify-between items-center w-full  font-Helvetica  fixed top-0 z-[20]">
      {notifications && (
        <DashboaradPortal isOpen={showViewQuoteModal} closeModal={closeModal}>
          <ViewQuote
            quote={notifications[notificationNumber]?.quote}
            closeModal={closeModal}
          />
        </DashboaradPortal>
      )}

      <Link href={"/"} className="hidden md:block">
        <h1 className="uppercase text-white cursor-pointer">Movie quotes</h1>
      </Link>

      <CiMenuBurger
        className="md:hidden block text-2xl  cursor-pointer"
        onClick={() => setshowMobileMenu(true)}
      />

      {showMobileMenu && (
        <div className="absolute w-full h-screen bg-background top-0 left-0 z-40  md:hidden">
          <AiOutlineClose
            onClick={() => setshowMobileMenu(false)}
            className="right-10 top-10 absolute text-xl cursor-pointer"
          />
          <div className="flex items-center gap-5  px-10 pt-10   ">
            <ProfilePic size="12" />

            <Link href={"/profile"}>
              <div>
                <h2 className="text-md ">{user?.name}</h2>
                <p className="text-xs text-gray-100">
                  {t("Edit your profile")}
                </p>
              </div>
            </Link>
          </div>
          <Link href={"/"}>
            <div className="flex items-center gap-4 mb-2 text-md cursor-pointer text-md mt-7 hover:bg-secondary px-10 py-3">
              <BsHouseDoor
                className={`text-2xl ${router.route === "/" && "text-red-600"}`}
              />
              <p>{t("News feed")}</p>
            </div>
          </Link>
          <Link href={"/movies"}>
            <div className="flex items-center gap-4  text-md cursor-pointer text-md  hover:bg-secondary px-10 py-3">
              <BsCameraReels
                className={`text-2xl ${
                  router.route === "/movies" && "text-red-600"
                }`}
              />
              <p>{t("List of movies")}</p>
            </div>
          </Link>

          <div className="px-10 py-3 flex gap-4">
            <Link href={asPath} locale="en">
              <p>en</p>
            </Link>
            <Link href={asPath} locale="ka">
              <p>ka</p>
            </Link>
          </div>
        </div>
      )}

      <div className="flex  w-80  justify-end items-center md:gap-3">
        <div
          className="relative cursor-pointer"
          onClick={handleToggleNotification}
        >
          {notificationTotalNumber > 0 && (
            <div className="bg-red-600 rounded-full w-1 h-1 p-2  absolute top-[-2px] right-0 text-white flex justify-center items-center text-sm">
              <p className="text-xs ">{notificationTotalNumber}</p>
            </div>
          )}

          <IoMdNotificationsOutline className="text-3xl text-white" />

          {showNotification && (
            <OutsideClickHandler
              onOutsideClick={handleClickOutside}
              useCapture={true}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className=" hidden md:block  max-w-xl w-[800px] select-none min-h-fit absolute top-10 right-[-150px] bg-black rounded-md p-3 "
              >
                <RiArrowUpSFill className="absolute top-[-.8rem] right-[9.5rem] text-black text-2xl " />

                <div className="mb-5 ">
                  <div className="flex justify-between items-center">
                    <p className="text-xl">{t("notifications")}</p>
                    <p
                      onClick={markNotificationAsRead}
                      className="underline text-sm"
                    >
                      {t("mark as read")}
                    </p>
                  </div>
                </div>

                <div className="overflow-y-auto h-fit max-h-[30rem]">
                  {notifications && notifications?.length === 0 ? (
                    <h2>{t("You do not have notifications")} </h2>
                  ) : (
                    notifications?.map((notification: notification, i) => {
                      return (
                        <div
                          key={notification.id}
                          onClick={() => {
                            handleClickOutside();
                            seenNotification(notification.id);
                            setShowViewQuoteModal(true);
                            setNotificationNumber(i);
                          }}
                        >
                          <Notification notification={notification} />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </OutsideClickHandler>
          )}
        </div>

        {showNotificationMobile && (
          <OutsideClickHandler
            onOutsideClick={handleClickOutsideNotificationMobile}
            useCapture={true}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute  top-16 left-0 min-h-fit w-full select-none  bg-black p-4   md:hidden"
            >
              <RiArrowUpSFill className=" absolute top-[-1rem] right-[4.5rem] text-black text-3xl " />
              <div className=" mb-5 ">
                <div className="flex justify-between items-center  ">
                  <p className="text-xl">{t("notifications")}</p>
                  <p
                    className="underline cursor-pointer text-sm text-right"
                    onClick={markNotificationAsRead}
                  >
                    {t("mark as read")}
                  </p>
                </div>
              </div>

              <div className="overflow-y-auto h-fit max-h-[70vh]">
                {notifications && notifications.length === 0 ? (
                  <h2>You do not have notifications </h2>
                ) : (
                  notifications?.map((notification: notification, i) => {
                    return (
                      <div
                        key={notification.id}
                        onClick={() => {
                          handleClickOutside();
                          seenNotification(notification.id);
                          setShowViewQuoteModal(true);
                          setNotificationNumber(i);
                        }}
                      >
                        <Notification notification={notification} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </OutsideClickHandler>
        )}

        <div className="px-2">
          <LanguageSwitcher />
        </div>

        <BiSearch
          className="md:hidden block text-2xl cursor-pointer "
          onClick={() => setshowMobileSearch(true)}
        />

        {showMobileSearch && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="absolute w-full h-screen bg-background top-0 left-0 z-40  md:hidden"
          >
            <div className="flex items-center p-3 border-b border-gray-600">
              <AiOutlineArrowLeft
                onClick={() => setshowMobileSearch(false)}
                className="text-2xl cursor-pointer"
              />

              <input
                type="text"
                className="bg-transparent w-full p-2 ring-0 outline-none"
                placeholder="search..."
                {...register("searchQuery")}
              />
            </div>

            <div className="px-10 py-5 text-gray-400">
              <h2>Enter @ to search movies</h2>
              <h2>Enter # to search quotes </h2>
            </div>
          </form>
        )}

        <button
          className="px-5 py-2 text-sm bg-transparent text-white rounded-md border border-white md:block hidden w-28"
          onClick={logout}
        >
          {t("log out")}
        </button>
      </div>
    </div>
  );
};

export default NewsFeedHeader;
