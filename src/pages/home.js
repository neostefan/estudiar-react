import React from "react";
import { useHistory } from "react-router";
import Hero from "../assets/hero.jpg";
import Asset01 from "../assets/asset_01.jpg";
import Asset02 from "../assets/asset_02.jpg";

const Landing = () => {
  let history = useHistory();

  return (
    <>
      <div className=" relative flex m-0 p-0 flex-col">
        <div className="max-w-full flex flex-col-reverse items-center sm:flex sm:flex-row bg-white-50 sm:justify-around sm:items-center">
          <span className="max-w-full flex flex-col p-4 items-center sm:pl-6 sm:w-1/3 sm:flex sm:flex-col sm:items-center">
            <pre className="sm:mb-4 mb-1 text-purple-900 m-0 p-0 font-mono font-bold text-xl sm:text-3xl whitespace-pre-wrap italic">
              Digitize Your Learning Experience
            </pre>
            <div className="sm:mb-4 mb-1 text-purple-500 m-0 p-0 font-serif italic font-light text-xl">
              Join us today
            </div>
            <div
              className="dark-btn font-bold text-center w-32"
              onClick={() => history.push("/register")}
            >
              Sign Up
            </div>
          </span>
          <span className="sm:w-2/3 sm:pr-6 p-2 rounded-sm">
            <img className="max-h-full" src={Hero} alt="hero.jpg" />
          </span>
        </div>
        <div className="min-w-full flex flex-col items-center sm:min-w-full sm:m-0 sm:p-0 sm:flex sm:flex-row sm:justify-around">
          <span className="w-auto p-4 sm:w-7/12 sm:h-72 sm:m-0 sm:p-4">
            <img
              className="max-w-full max-h-full m-auto p-0"
              src={Asset02}
              alt="asset02.jpg"
            />
          </span>
          <span className="w-auto p-6 flex flex-col items-center justify-center sm:w-5/12 sm:pl-6">
            <div className="italic text-purple-900 font-serif font-bold text-3xl">
              Extensive Library
            </div>
            <pre className="pt-3 text-center text-purple-500 font-sans font-light text-xl whitespace-pre-wrap">
              You no longer need to search for materials for your course work
              get all the materials, past questions, solutions and excerpts you
              need all in one place
            </pre>
          </span>
        </div>
        <div className="min-w-full flex flex-col items-center sm:min-w-full sm:m-0 sm:p-0 sm:flex sm:flex-row-reverse sm:justify-around">
          <span className="w-auto p-4 bg-indigo-100 sm:w-7/12 sm:h-72 sm:m-0 rounded-t-3xl">
            <img
              className="max-w-full max-h-full m-auto p-0"
              src={Asset01}
              alt="asset01.jpg"
            />
          </span>
          <span className="w-auto p-6 flex flex-col items-center justify-center sm:w-5/12 sm:pl-6">
            <div className="italic text-purple-900 font-serif font-bold text-3xl">
              Easily Accessible
            </div>
            <pre className="pt-3 text-center text-purple-500 font-sans font-light text-xl whitespace-pre-wrap">
              Access your course work anytime and anywhere. Read up at your own
              schedule with all materials and past questions with solutions
              right on your device
            </pre>
          </span>
        </div>
      </div>
    </>
  );
};

export default Landing;
