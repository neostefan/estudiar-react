import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import authContext from "../context/auth-context";
import brandImg from "../assets/logo.png";

const Navigation = () => {
  let { auth, setAuth } = React.useContext(authContext);
  let { pathname } = useLocation();
  let history = useHistory();

  let LogOut = () => {
    localStorage.removeItem("expires");
    localStorage.removeItem("token");
    console.log(auth);
    history.push("/");
    setAuth(false);
  };

  if (auth === true) {
    return (
      <div className="p-1 m-0 bg-white-50 font-bold flex flex-col sm:flex sm:flex-row sm:items-center">
        <img src={brandImg} className="m-1 w-48 sm:w-auto" alt="logo.png" />
        <span className="sm:flex-auto" />
        <div
          className={
            pathname === "/d"
              ? "s-nav-link-dark sm:dark-btn"
              : "nav-link-dark sm:dark-btn"
          }
        >
          <Link to="/d">Profile</Link>
        </div>
        <div className="nav-link-light sm:light-btn" onClick={LogOut}>
          Log Out
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 m-0 bg-white-50 font-bold flex flex-col sm:flex sm:flex-row sm:items-center">
      <Link to="/">
        <img src={brandImg} className="m-1 w-48 sm:w-auto" alt="logo.png" />
      </Link>
      <span className="sm:flex-auto" />
      <div
        className={
          pathname === "/register"
            ? "s-nav-link-dark sm:dark-btn"
            : "nav-link-dark sm:dark-btn"
        }
      >
        <Link to="/register">Sign Up</Link>
      </div>
      <div
        className={
          pathname === "/login"
            ? "s-nav-link-light sm:light-btn"
            : "nav-link-light sm:light-btn"
        }
      >
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Navigation;
