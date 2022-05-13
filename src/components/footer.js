import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  let date = new Date().getFullYear();

  return (
    <footer className="flex min-w-full p-3 flex-col items-center text-purple-600 bg-indigo-100">
      <Link to="/estudiar-react/privacy-policy">
        <span className="font-light">privacy policy</span>
      </Link>
      &copy;Copyright Estudiar {date}
    </footer>
  );
};

export default Footer;
