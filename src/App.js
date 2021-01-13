import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './hoc/layout';
import Nav from './components/nav';
import Footer from './components/footer';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Upload from './pages/upload';
import Courses from './pages/courses';
import Materials from './pages/materials';

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Nav/>
          <Switch>
            <Route path="/materials"><Materials/></Route>
            <Route path="/courses"><Courses/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/upload"><Upload/></Route>
            <Route path="/"><Home/></Route>
          </Switch>
        </Router>
      </Layout>
      <Footer/>
    </>
  );
}

export default App;
