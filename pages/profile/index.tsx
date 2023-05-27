import { DashboardWrapper } from "@/components";
import React from "react";

const index = () => {
  return (
    <DashboardWrapper>
      <h1 className="mb-16 mx-3 ">My profile</h1>

      <div className="bg-black/40 rounded-md mt-5 px-5 w-full  flex flex-col items-center  ">
        <img
          src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?cs=srgb&dl=pexels-tony-jamesandersson-1674752.jpg&fm=jpg"
          alt="profile"
          className="aspect-square w-32 h-32 object-cover rounded-full  top-[-40px] mt-[-40px]"
        />
        <div className=" w-full max-w-md mt-6 p-2">
          <p>Username</p>
          <div className="flex  gap-1 items-center mt-2 mb-8">
            <div className="bg-gray-200 text-black rounded-md w-full p-2 max-w-sm ">
              Nino Tabagari
            </div>

            <button className="w-16">Edit</button>
          </div>

          <p>Email</p>
          <div className="flex  gap-1 items-center mt-2 mb-8">
            <div className="bg-gray-200 text-black rounded-md w-full p-2 max-w-sm ">
              ninotabagari@gmail.com
            </div>
            <div className="w-16"></div>
          </div>

          <p>Password</p>
          <div className="flex  gap-1 items-center mt-2 mb-8">
            <div className="bg-gray-200 text-black rounded-md w-full p-2 max-w-sm ">
              ••••••••••••
            </div>

            <button className="w-16">Edit</button>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default index;
