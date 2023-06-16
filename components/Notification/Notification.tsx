import { Quote, notification } from "global";
import React, { Dispatch, SetStateAction } from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsChatQuote } from "react-icons/bs";
import moment from "moment";

const Notification = ({
  notification,
  setModalQuote,
  setShowViewQuoteModal,
  handleClickOutside,
}: {
  notification: notification;
  setModalQuote: Dispatch<SetStateAction<Quote | null>>;
  setShowViewQuoteModal: Dispatch<SetStateAction<boolean>>;
  handleClickOutside: () => void;
}) => {
  return (
    <div
      onClick={() => {
        setModalQuote(notification.quote);
        setShowViewQuoteModal(true);
        handleClickOutside();
      }}
    >
      <div className="w-full cursor-pointer rounded-md border border-gray-700 px-3 py-4 flex justify-between items-center mb-3">
        <div className="flex gap-4 ">
          <img
            src={
              notification.sender?.google_id
                ? notification.sender?.img
                : `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${notification.sender?.img}`
            }
            alt="profile"
            className="aspect-square w-10 h-10 object-cover rounded-full"
          />
          <div className="text-sm">
            <h3>{notification.sender.name}</h3>

            {notification.status === "comment" ? (
              <div className="flex items-center gap-2">
                <BsChatQuote />
                <p>Commented to your movie quote</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AiTwotoneHeart className="text-red-600" />
                <p>Reacted to your quote</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-end flex-col min-w-[100px] text-sm">
          <p>{moment(notification.created_at).fromNow()}</p>
          {notification.seen || <p className="text-green-700">New</p>}
        </div>
      </div>
    </div>
  );
};

export default Notification;
