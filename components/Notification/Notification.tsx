import React from "react";
import { BsChatQuote } from "react-icons/bs";

const Notification = () => {
  return (
    <div className="w-full rounded-md border border-gray-700 px-3 py-4 flex justify-between items-center mb-3">
      <div className="flex gap-4 ">
        <img
          src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
          alt="profile"
          className="aspect-square w-10 h-10 object-cover rounded-full "
        />
        <div className="text-sm">
          <h3>Nino Tabagari</h3>
          <div className="flex items-center gap-2">
            <BsChatQuote />
            <p>Commented to your movie quote</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-end flex-col min-w-[100px] text-sm">
        <p>5 min ago</p>
        <p className="text-green-700">New</p>
      </div>
    </div>
  );
};

export default Notification;
