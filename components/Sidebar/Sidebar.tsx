import React from "react";
import { BsHouseDoor, BsCameraReels } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div>
      <div className="flex items-center gap-5 ">
        <img
          src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
          alt="profile"
          className="aspect-square w-12 object-cover rounded-full "
        />
        <div>
          <h2 className="text-md ">Nino Tabagari</h2>
          <p className="text-xs text-gray-100">Edit your profile</p>
        </div>
      </div>

      <div className="flex items-center gap-4 my-9 text-md cursor-pointer text-md mt-10">
        <BsHouseDoor className="text-2xl" />
        <p>News feed</p>
      </div>
      <div className="flex items-center gap-4 my-9 text-md cursor-pointer text-md">
        <BsCameraReels className="text-2xl" />
        <p>BsCameraReels</p>
      </div>
    </div>
  );
};

export default Sidebar;
