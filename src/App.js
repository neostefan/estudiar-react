import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import authContext from './context/auth-context';

import Layout from './hoc/layout';

import checkAuthStatus from './util/auth-util';

import Nav from './components/nav';
import Footer from './components/footer';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Upload from './pages/upload';
import Courses from './pages/courses';
import Materials from './pages/materials';
import Profile from './pages/profile';

function App() {
  let [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem('token');
    let expiresIn = +localStorage.getItem('expires');
    let status = checkAuthStatus(token, expiresIn);
    setAuth(status);
  }, [])

  return (
    <>
      <Layout>
        <authContext.Provider value={{auth, setAuth}}>
          <Router>
            <Nav/>
            <Switch>
              <Route path="/d"><Profile/></Route>
              <Route path="/materials"><Materials/></Route>
              <Route path="/courses"><Courses/></Route>
              <Route path="/register"><Register/></Route>
              <Route path="/login"><Login/></Route>
              <Route path="/upload"><Upload/></Route>
              <Route path="/"><Home/></Route>
            </Switch>
          </Router>
        </authContext.Provider>
      </Layout>
      <Footer/>
    </>
  );
}

export default App;
