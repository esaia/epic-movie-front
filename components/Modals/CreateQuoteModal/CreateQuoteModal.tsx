import { ProfilePic } from "@/components";
import React from "react";
import { AiOutlineCamera, AiOutlineCaretDown } from "react-icons/ai";
import { BsCameraReels } from "react-icons/bs";

const CreateQuoteModal = () => {
  return (
    <div className="w-full text-center z-40">
      <h2 className="py-5 border-b border-gray-600 text-xl">write new quote</h2>

      <div className="p-5">
        <div className="flex items-center gap-2  mb-7">
          <ProfilePic size="10" />

          <p>Nino Tabagari</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative w-full  border border-gray-600 rounded-md">
            <p className="absolute right-2 top-1">Eng</p>
            <textarea
              className="w-full outline-none bg-transparent placeholder:italic p-2 "
              placeholder="Start create new quote"
            ></textarea>
          </div>

          <div className="relative w-full  border border-gray-600 rounded-md ">
            <p className="absolute right-2 top-1">Geo</p>
            <textarea
              className="w-full outline-none bg-transparent placeholder:italic p-2 "
              placeholder="ახალი ციტატა"
            ></textarea>
          </div>

          <div className="w-full border border-gray-600 rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md">
            <AiOutlineCamera className="text-xl min-w-[30px]" />
            <p>Drag & drop your image here or</p>
            <label
              htmlFor="file"
              className="px-2 py-1 bg-purple-900 cursor-pointer"
            >
              Choose file
            </label>
            <input id="file" type="file" className="hidden" />
          </div>

          <div className="w-full  bg-black  rounded-m flex items-center gap-3 justify-start px-3 py-5 rounded-md">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <BsCameraReels />
                <p>Choose movie</p>
              </div>

              <AiOutlineCaretDown className="text-white" />
            </div>
          </div>

          <button className="w-full bg-red-600 p-1">Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuoteModal;
