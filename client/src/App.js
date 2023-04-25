import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store/store";

import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detailed from './views/Detailed/Detailed';
import Create from './views/Create/Create';
import Navbar from './components/Navbar/Nabvar';
import ErrorPage from './components/ErrorPage/ErrorPage';

import './App.css';



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/details/:id">
            <Detailed />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
