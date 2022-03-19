import React from "react";
import { useHistory } from "react-router-dom";
import { GrClose } from "react-icons/gr";

import axios from "../axios-inst";
import brandImg from "../assets/elogo.png";
import authContext from "../context/auth-context";
import { emailSanitization, passwordSanitization } from "../util/sanitize-util";
import { checkErrorItem } from "../util/gen-util";
import { checkServerErrorType } from "../util/err-util";

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

const LogIn = () => {
  let { setAuth } = React.useContext(authContext);

  let [state, dispatch] = React.useReducer(Reducer, {
    email: "",
    password: "",
    errors: [],
    msg: "",
    msgType: "",
    loading: false,
    show: false,
  });

  let history = useHistory();

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
        let msg = "invalid password length, must be alphanumneric";
        dispatch({ type: "ERROR_OCCURRED", msg, errType: "password" });
      }
    }
  };

  let checkForErrors = (type) => {
    if (state.errors.length > 0) {
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
    try {
      let fd = new FormData();
      fd.append("email", state.email);
      fd.append("password", state.password);
      let res = await axios.post("/auth/login", fd);
      if (res.data.msg) {
        dispatch({ type: "SUBMITTED", msgType: "err", msg: res.data.msg });
      } else {
        let token = res.data.token;
        let duration = res.data.exp * 1000;
        let expiresIn = new Date().getTime() + duration;
        localStorage.setItem("token", token);
        localStorage.setItem("expires", expiresIn);
        setTimeout(() => {
          setAuth(false);
        }, duration);
        setAuth(true);
        history.push("/d");
      }
      console.log(res.data);
    } catch (e) {
      let msg = checkServerErrorType(e);
      dispatch({ type: "SUBMITTED", msgType: "err", msg: msg });
    }
    dispatch({ type: "RESET" });
  };

  return (
    <div className="center-page-col">
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
            <label className="text-purple-500">E-mail</label>
            <input
              className="input"
              placeholder="Enter Your E-mail"
              name="email"
              type="email"
              onChange={handleChange}
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
          <div className="h-1/3 flex flex-col items-center">
            <button className="dark-btn">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );

  // return (
  //     <Styles>
  //         <div className="tint"/>
  //         <div className="login">
  //             <Card>
  //                 <Card.Body>
  //                     {(state.msgType !== '') ?
  //                         <Alert
  //                             show={state.show}
  //                             variant={(state.msgType !== 'err') ? 'success' : 'danger'}
  //                             onClose={() => dispatch({type: "MSG_SEEN"})}
  //                             dismissible
  //                         >
  //                             {state.msg}
  //                         </Alert> : null
  //                     }
  //                     <Form onSubmit={handleSubmit}>
  //                         <Form.Group>
  //                             <Form.Label>E-mail</Form.Label>
  //                             <Form.Control
  //                                 type="email"
  //                                 name="email"
  //                                 onChange={handleChange}
  //                                 value={state.email}
  //                                 placeholder="Enter your e-mail"
  //                             />
  //                             {checkForErrors('email') ?
  //                                 <Form.Text style={{color: "red"}}>
  //                                     {checkForErrors('email')}
  //                                 </Form.Text> : null
  //                             }
  //                         </Form.Group>
  //                         <Form.Group>
  //                             <Form.Label>Password</Form.Label>
  //                             <Form.Control
  //                                 type="password"
  //                                 name="password"
  //                                 onChange={handleChange}
  //                                 value={state.password}
  //                                 placeholder="Enter your password"
  //                             />
  //                             {checkForErrors('password') ?
  //                                 <Form.Text style={{color: "red"}}>
  //                                     {checkForErrors('password')}
  //                                 </Form.Text> : null
  //                             }
  //                         </Form.Group>
  //                         <Button
  //                         text="Sign In"
  //                         type="submit"/>
  //                     </Form>
  //                 </Card.Body>
  //             </Card>
  //         </div>
  //     </Styles>
  // );
};

export default LogIn;
