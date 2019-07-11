import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard";
import Steps from "./components/steps";
import FHIRConnection from "./FHIRconnection/FHIRconnection";
import Trials from "./components/trials";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

import SideBar from "./components/sidebar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

          <Switch>
            <Route exact path="/" component={FHIRConnection} />
            <Route path="/trials" component={Trials} />
            <Route path="/login" component={FHIRConnection} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/burgers" component={} /> */}
            <Route path="/steps" component={Steps} />
            <Route
              render={() => {
                return <NotFoundPage />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
