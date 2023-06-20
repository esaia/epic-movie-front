import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { AuthContext } from "context/AuthContext";
import { useQuery, useQueryClient } from "react-query";
import { Quote } from "global";
import echo from "lib/pusher";
import {
  logoutRequest,
  seenNotificationRequest,
  fetchNotifcations,
} from "lib/index";

const useNewsFeedHeader = () => {
  const router = useRouter();
  const { asPath } = router;
  const { user } = useContext(AuthContext);
  const t = useTranslations("Notifications");
  const queryClient = useQueryClient();
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationMobile, setShowNotificationMobile] = useState(false);
  const [showMobileMenu, setshowMobileMenu] = useState(false);
  const [modalQuote, setModalQuote] = useState<Quote | null>(null);
  const [showViewQuoteModal, setShowViewQuoteModal] = useState(false);
  const [notificationTotalNumber, setNotificationTotalNumber] = useState(0);

  const closeModal = () => {
    setShowViewQuoteModal(false);
  };

  const handleToggleNotification = () => {
    setShowNotification(true);
    setShowNotificationMobile(true);
  };

  const handleClickOutside = () => {
    setShowNotification(false);
  };

  const handleClickOutsideNotificationMobile = () => {
    setShowNotificationMobile(false);
  };

  const logout = () => {
    Cookies.remove("user-email", { path: "" });
    localStorage.removeItem("user");
    logoutRequest();
    router.push("/landing");
    router.reload();
  };

  const { data: notifications } = useQuery(["fetchNotification"], {
    queryFn: fetchNotifcations,
  });

  const seenNotification = async (id: number) => {
    try {
      seenNotificationRequest(id);
      queryClient.invalidateQueries(["fetchNotification"]);
    } catch (error) {
      console.error(error);
    }
  };

  const markNotificationAsRead = () => {
    const ids = notifications
      ?.filter((item) => !item.seen)
      .map((item) => item.id);

    if (ids) {
      for (const id of ids) {
        seenNotification(+id);
      }
      queryClient.invalidateQueries(["fetchNotification"]);
    }
  };

  useEffect(() => {
    const handleCommentEvent = ({ quoteUserId }: { quoteUserId: number }) => {
      if (quoteUserId === JSON.parse(localStorage.getItem("user") || "{}").id) {
        queryClient.invalidateQueries(["fetchNotification"]);
      }
    };

    echo
      .channel("comments")
      .listen(
        "CommentNotificationEvent",
        (quoteUserID: { quoteUserId: number }) => {
          handleCommentEvent(quoteUserID);
        }
      );

    return () => {
      echo
        .channel("comments")
        .stopListening("CommentNotificationEvent", handleCommentEvent);
      echo.leaveChannel("comments");
    };
  }, []);

  useEffect(() => {
    if (notifications) {
      const total = notifications?.reduce((acc, item) => {
        if (!item.seen) {
          return acc + 1;
        }
        return acc;
      }, 0);

      setNotificationTotalNumber(total);
    }
  }, [notifications]);

  return {
    showNotification,
    handleToggleNotification,
    logout,
    handleClickOutside,
    t,
    user,
    router,
    showMobileMenu,
    setshowMobileMenu,
    asPath,
    notifications,
    modalQuote,
    setModalQuote,
    showViewQuoteModal,
    setShowViewQuoteModal,
    closeModal,
    seenNotification,
    notificationTotalNumber,
    showNotificationMobile,
    handleClickOutsideNotificationMobile,
    markNotificationAsRead,
  };
};

export default useNewsFeedHeader;
