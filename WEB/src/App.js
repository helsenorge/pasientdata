import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Dashboard from "./Pages/Dashboard/dashboard";
import Steps from "./Pages/Steps/steps";
import FHIRConnection from "./FHIRCommunication/FHIRCommunication";
import Trials from "./components/Trials/trials";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

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
