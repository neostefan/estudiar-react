import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './hoc/layout';
import Nav from './components/nav';
import Footer from './components/footer';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Nav/>
          <Switch>
            <Route path="/register"><Register/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/"><Home/></Route>
          </Switch>
        </Router>
      </Layout>
      <Footer/>
    </>
  );
}

export default App;
