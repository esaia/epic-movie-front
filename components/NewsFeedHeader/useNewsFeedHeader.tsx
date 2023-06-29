import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { AuthContext } from "context/AuthContext";
import { useQuery, useQueryClient } from "react-query";
import echo from "lib/pusher";
import {
  logoutRequest,
  seenNotificationRequest,
  fetchNotifcations,
} from "lib/index";
import { useForm } from "react-hook-form";
import { queryType } from "@/global";
import { useQuote } from "@/context/QuoteContext";

const useNewsFeedHeader = () => {
  const router = useRouter();
  const { asPath } = router;
  const { user } = useContext(AuthContext);
  const t = useTranslations("Notifications");
  const queryClient = useQueryClient();
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationMobile, setShowNotificationMobile] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState(-1);
  const [showMobileMenu, setshowMobileMenu] = useState(false);
  const [showMobileSearch, setshowMobileSearch] = useState(false);
  const [showViewQuoteModal, setShowViewQuoteModal] = useState(false);
  const [notificationTotalNumber, setNotificationTotalNumber] = useState(0);

  const form = useForm<queryType>();
  const { handleSubmit, register } = form;

  const { setSearchQuery } = useQuote();

  const onSubmit = async (query: queryType) => {
    setSearchQuery(query.searchQuery);
    router.push("/");
    setshowMobileSearch(false);
  };

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
      queryClient.invalidateQueries(["fetchQuotes"]);
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

    echo
      .channel("likes")
      .listen(
        "LikeNotificationEvent",
        (quoteUserID: { quoteUserId: number }) => {
          handleCommentEvent(quoteUserID);
        }
      );

    return () => {
      echo
        .channel("comments")
        .stopListening("CommentNotificationEvent", handleCommentEvent);
      echo
        .channel("likes")
        .stopListening("LikeNotificationEvent", handleCommentEvent);
      echo.leaveChannel("comments");
      echo.leaveChannel("likes");
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
    closeModal,
    seenNotification,
    notificationTotalNumber,
    showNotificationMobile,
    handleClickOutsideNotificationMobile,
    markNotificationAsRead,
    showViewQuoteModal,
    setShowViewQuoteModal,
    notificationNumber,
    setNotificationNumber,
    showMobileSearch,
    setshowMobileSearch,
    handleSubmit,
    register,
    onSubmit,
  };
};

export default useNewsFeedHeader;
