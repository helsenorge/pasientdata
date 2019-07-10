import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard";
import Burgers from "./components/burgers";
import Steps from "./components/steps";
import Redirecter from "./FHIRconnection/FHIRconnection";
import Trials from "./components/trials";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Redirecter} />
            <Route path="/trials" component={Trials} />
            <Route path="/login" component={Redirecter} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/burgers" component={Burgers} />
            <Route path="/steps" component={Steps} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
