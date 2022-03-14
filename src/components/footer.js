import React from "react";

const Footer = () => {
  let date = new Date().getFullYear();

  return (
    <footer className="flex min-w-full p-3 flex-col items-center text-purple-600 bg-indigo-100">
      &copy;Copyright Estudiar {date}
    </footer>
  );
};

export default Footer;
