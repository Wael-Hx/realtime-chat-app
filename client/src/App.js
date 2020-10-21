import React from "react";
import { Provider } from "react-redux";
import Store from "./Store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/nav/Navbar";
import "./App.css";
import Home from "./components/home/Home";
import Chat from "./components/home/Chat";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/:room" component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
