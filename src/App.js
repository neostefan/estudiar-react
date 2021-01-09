import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './hoc/layout';
import Nav from './components/nav';
import Footer from './components/footer';

import Home from './pages/home';

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Nav/>
          <Switch>
            <Route path="/"><Home/></Route>
          </Switch>
        </Router>
      </Layout>
      <Footer/>
    </>
  );
}

export default App;
