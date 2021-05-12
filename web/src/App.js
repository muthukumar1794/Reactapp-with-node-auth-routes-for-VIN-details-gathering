import logo from "./logo.svg";
import "./App.css";
import { useEffect } from 'react'
import { BrowserRouter as Router, useHistory, Route } from "react-router-dom";
import { Redirect, Switch, withRouter } from "react-router";
import Login from "./components/login";
import Signup from "./components/signup";
import PastRecords from './components/PastRecords'
import Index from "./components/index";
import Logout from "./components/logout";
import { Provider } from 'react-redux'
import store from './Redux/store'
import Home from "./components/Home";

export const apiHost = 5200;
export const apiBase = `http://localhost:${apiHost}`;

export const bg = {
  margin: "12px",
  textAlign: "center",
};

export const searchFormsAlignment = {
  textAlign: "center",
  margin: "11px 0",
};
export const alertStyle = {
  top: "15%",
  width: "450px",
  position: "absolute",
  zIndex: "9",
  right: "4.4%",
};

function App(props) {
  const history = useHistory()

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);


    });

  }, [])

  return (
    <Provider store={store} autoComplete="off">
      <Router>
        <div className="App">
          <Route path="/index" exact strict>
            <Home {...props} />
          </Route>
          <Route path="/" exact component={Login} {...props} />
          <Route path="/signup/form" exact component={Signup} {...props} />
          <Route path="/user/logout" exact component={Logout} {...props} />

        </div>
      </Router>
    </Provider>
  );
}

export default App;