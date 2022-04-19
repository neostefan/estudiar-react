import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import authContext from "./context/auth-context";

import checkAuthStatus from "./util/auth-util";

import Footer from "./components/footer";
import Navigation from "./components/nav";

import Landing from "./pages/home";

function App() {
  let [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    let expiresIn = +localStorage.getItem("expires");
    let status = checkAuthStatus(token, expiresIn);
    setAuth(status);
  }, []);

  return (
    <>
      <authContext.Provider value={{ auth, setAuth }}>
        <Router>
          <Navigation />
          <Switch>
            {/* <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/register">
              <Register />
            </Route> */}
            {/* <Route path="/d">
              <DashBoard />
            </Route> */}
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </authContext.Provider>
    </>
  );
}

export default App;
