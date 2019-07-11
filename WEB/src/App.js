import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard";
import Burgers from "./components/burgers";
import Steps from "./components/steps";
import FHIRConnection from "./FHIRConnection/FHIRConnection";
import Trials from "./components/trials";
import NotFoundPage from "./NotFoundPage/NotFoundPage";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={FHIRConnection} />
            <Route path="/trials" component={Trials} />
            <Route path="/login" component={FHIRConnection} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/burgers" component={Burgers} />
            <Route path="/steps" component={Steps} />
            <Route
              render={() => {
                return (
                  <NotFoundPage />
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
