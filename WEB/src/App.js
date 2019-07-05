import React, { Component } from "react";
import "./styles.css";
import HomePage from "./loginPage/homePage.js";
import fhirlaunch from "./api/fhirlaunch.js";
import dashboard from "./components/dashboard";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={dashboard} />
          <Route path="/login" component={HomePage} />
          <Route path="/home" component={fhirlaunch} />
          <Route path="/dashboard" component={dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
