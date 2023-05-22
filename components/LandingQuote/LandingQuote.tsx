import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
interface propsType {
  quote: string;
  movie: string;
  image: string;
}

const LandingMovie = ({ quote, movie, image }: propsType) => {
  return (
    <div
      className={`md:h-screen h-[50vh] bg-gray-200  bg-center bg-cover bg-no-repeat snap-y  md:bg-fixed relative   z-30 ${image}`}
    >
      <div className="gradient w-full h-full  z-40  "></div>
      <div className="w-fit  md:pl-20 left-0 absolute top-[50%] translate-y-[-50%] md:top-[30%] px-4 m-4 ">
        <div className="flex justify-start items-start   mb-5  gap-5 ">
          <div className=" w-12  md:gap-20 flex-shrink-0">
            <AiOutlineMinus className="text-white text-5xl" />
          </div>
          <h1 className="text-white text-xl md:text-4xl font-bold  md:max-w-2xl">
            {quote}
          </h1>
        </div>
        <div className="flex justify-start items-start  mb-5 gap-5 ">
          <div className="w-12  bg-yellow-400 flex-shrink-0 "></div>
          <p className="font-bold text-md md:text-2xl text-white">{movie}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingMovie;
