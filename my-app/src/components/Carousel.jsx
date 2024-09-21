import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { slides } from "../assets/imageSlide";

const Carousel = ({ search, setSearch }) => {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative h-[70vh] overflow-hidden md:block hidden">
      <div
        className="w-screen flex duration-400 transition-all ease-in-out "
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="Carousel"
            className="w-full h-full object-contain"
          />
        ))}
      </div>

      <div className="flex justify-between absolute top-0 start-0 z-30 h-full w-full">
        <button
          type="button"
          className="px-4 cursor-pointer"
          onClick={handlePrevious}
        >
          <FaArrowCircleLeft size={30} color="white" />
        </button>
        <button
          type="button"
          className="px-4 cursor-pointer"
          onClick={handleNext}
        >
          <FaArrowCircleRight size={30} color="white" />
        </button>
      </div>

      <div className=" py-2 px-4 absolute top-1/2 left-40 w-3/4 hidden">
        <input
          name="search"
          type="text"
          // value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=""
        />
      </div>
    </div>
  );
};

export default Carousel;
