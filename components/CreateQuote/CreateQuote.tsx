import React, { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";

const CreateQuote = () => {
  const [isSearching, setisSearching] = useState(false);

  return (
    <div className="flex w-full gap-3">
      <div className="flex w-full flex-3 items-center gap-3 bg-secondary px-3 py-2 cursor-pointer rounded-md">
        <HiOutlinePencilSquare />
        <p>Write new quote</p>
      </div>

      <div
        className={`hidden md:flex items-center gap-2 text-gray-200  ${
          isSearching && "w-8/12 border-b border-gray-500"
        } `}
        onClick={() => setisSearching(true)}
      >
        {!isSearching && (
          <>
            <BiSearch className="text-xl" />
            <p>Search by </p>
          </>
        )}
        {isSearching && (
          <div className="w-full flex items-center gap-1">
            <BiSearch className="text-xl" />

            <input
              type="text"
              placeholder="Enter @ to search movies, Enter # to search quotes"
              className="w-full outline-none px-2 bg-transparent"
              onBlur={() => setisSearching(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuote;
