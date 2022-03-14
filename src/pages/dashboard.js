import React from "react";
import { FaGooglePlay } from "react-icons/fa";

const DashBoard = () => {
  return (
    <div className="center-page-col gap-16 p-9">
      <span className="w-full text-purple-500 text-2xl font-semibold sm:w-2/3">
        Thank you for being a part of the estudiar community to make use of
        estudiar resources, kindly download our app for your respective platform
        in the links below
      </span>
      <div className="w-full flex gap-8 justify-center">
        <a className="flex flex-col" href="https://google.com">
          <FaGooglePlay size="75px" color="gray" />
          <span className="text-gray-600 text-center font-semibold">
            Android
          </span>
        </a>
      </div>
    </div>
  );
};

export default DashBoard;
