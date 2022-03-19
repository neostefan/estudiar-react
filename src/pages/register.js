import React from "react";
import { GrClose } from "react-icons/gr";

import axios from "../axios-inst";
import {
  engineering_depts,
  science_depts,
  faculties,
  years,
  checkErrorItem,
} from "../util/gen-util";
import { emailSanitization, passwordSanitization } from "../util/sanitize-util";
import { checkServerErrorType } from "../util/err-util";
import brandImg from "../assets/elogo.png";

const Reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.input]: action.value,
      };
    case "ERROR_OCCURRED":
      return {
        ...state,
        errors: [...state.errors, { type: action.errType, msg: action.msg }],
      };
    case "ERROR_RESOLVED":
      return {
        ...state,
        errors: state.errors.map((item) =>
          item.type === action.errType ? { type: "", msg: "" } : item
        ),
      };
    case "SUBMITTING":
      return {
        ...state,
        loading: true,
      };
    case "SUBMITTED":
      return {
        ...state,
        loading: false,
        msg: action.msg,
        show: true,
        msgType: action.msgType,
      };
    case "MSG_SEEN":
      return {
        ...state,
        show: false,
      };
    case "RESET":
      return {
        ...state,
        email: "",
        password: "",
        errors: [],
      };
    default:
      return state;
  }
};

const Register = () => {
  let [state, dispatch] = React.useReducer(Reducer, {
    name: "",
    email: "",
    password: "",
    faculty: "Engineering",
    dept: "",
    year: 1,
    errors: [],
    show: false,
    msg: "",
    msgType: "",
  });

  let handleChange = (e) => {
    dispatch({
      type: "INPUT_CHANGE",
      input: e.target.name,
      value: e.target.value,
    });

    if (e.target.name === "email") {
      let output = emailSanitization(e.target.value);
      if (output.status) {
        let errType = "email";
        dispatch({ type: "ERROR_RESOLVED", errType });
      } else {
        dispatch({ type: "ERROR_OCCURRED", msg: output.msg, errType: "email" });
      }
    }

    if (e.target.name === "password") {
      let status = passwordSanitization(e.target.value);
      if (status) {
        let errType = "password";
        dispatch({ type: "ERROR_RESOLVED", errType });
      } else {
        let msg = "password min length is 7 and must contain numbers";
        dispatch({ type: "ERROR_OCCURRED", msg, errType: "password" });
      }
    }
  };

  let checkFaculty = () => {
    if (state.faculty === "Engineering") {
      return engineering_depts.map((dept, i) => {
        if (i === 0) {
          return (
            <option key={dept} value={dept} selected>
              {dept}
            </option>
          );
        }

        return (
          <option key={dept} value={dept}>
            {dept}
          </option>
        );
      });
    }

    if (state.faculty === "Science") {
      return science_depts.map((dept, i) => {
        if (i === 0) {
          return (
            <option key={dept} value={dept} selected>
              {dept}
            </option>
          );
        }

        return (
          <option key={dept} value={dept}>
            {dept}
          </option>
        );
      });
    }
  };

  let checkForErrors = (type) => {
    if (state.errors.length > 0) {
      console.log(state.errors);
      let error = checkErrorItem(state.errors, type);
      if (error !== undefined) {
        return error.msg;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMITTING" });
    try {
      let fd = new FormData();
      fd.append("name", state.name);
      fd.append("email", state.email);
      fd.append("password", state.password);
      fd.append("faculty", state.faculty);
      fd.append("dept", state.dept);
      fd.append("year", state.year);
      let res = await axios.post("/auth/register", fd);
      console.log(res);
      dispatch({ type: "SUBMITTED", msg: res.data.msg, msgType: "notif" });
    } catch (e) {
      let error = checkServerErrorType(e);
      dispatch({ type: "SUBMITTED", msg: error, msgType: "err" });
    }

    dispatch({ type: "RESET" });
  };

  return (
    <div className="mb-3 min-h-full flex flex-col items-center justify-center">
      <div className="mb-3 w-14 h-14">
        <img src={brandImg} alt="logo.jpg" />
      </div>
      <div className="auth-card">
        {state.show ? (
          <div
            className={
              state.msgType !== "err" ? "alert-success" : "alert-danger"
            }
          >
            {state.msg}
            <GrClose
              className="cursor-pointer ml-auto"
              onClick={() => dispatch({ type: "MSG_SEEN" })}
            />
          </div>
        ) : null}
        <form
          className="min-h-full min-w-full flex flex-wrap flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="h-1/3 form-group">
            <label className="text-purple-500">Name</label>
            <input
              className="input"
              placeholder="Enter Your Full Name"
              name="name"
              type="text"
              onChange={handleChange}
            />
            {checkForErrors("name") ? (
              <pre className="error">{checkForErrors("name")}</pre>
            ) : null}
          </div>
          <div className="h-1/3 form-group">
            <label className="text-purple-500">E-mail</label>
            <input
              className="input"
              placeholder="Enter Your E-mail"
              name="email"
              type="email"
              onChange={handleChange}
              value={state.email}
            />
            {checkForErrors("email") ? (
              <pre className="error">{checkForErrors("email")}</pre>
            ) : null}
          </div>
          <div className="h-1/3 form-group">
            <label className="text-purple-500">Password</label>
            <input
              className="input"
              placeholder="Enter Your Password"
              name="password"
              type="password"
              onChange={handleChange}
            />
            {checkForErrors("password") ? (
              <pre className="error">{checkForErrors("password")}</pre>
            ) : null}
          </div>
          <div className="h-1/3 form-group">
            <label className="text-purple-500">Faculty</label>
            <select
              className="input"
              name="faculty"
              value={state.faculty}
              onChange={handleChange}
            >
              {faculties.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="h-1/3 form-group">
            <label className="text-purple-500">Department</label>
            <select
              className="input"
              name="dept"
              value={state.dept}
              onChange={handleChange}
            >
              {checkFaculty()}
            </select>
          </div>
          <div className="h-1/3 form-group">
            <label className="text-purple-500">Year</label>
            <select
              className="input"
              placeholder="Year"
              name="year"
              type="email"
              onChange={handleChange}
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
          <div className="h-1/3 flex flex-col items-center">
            <button className="dark-btn">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
