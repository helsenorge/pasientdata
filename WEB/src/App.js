import React, { Component } from "react";
import "./styles.css";
import HomePage from "./loginPage/homePage.js";
import fhirlaunch from "./api/fhirlaunch.js";
import dashboard from "./components/dashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Redirect from "./redirect/redirect";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={dashboard} />
            <Route path="/login" component={HomePage} />
            <Route path="/launch" component={fhirlaunch} />
            <Switch>
              <Route path="/redirect" component={Redirect} />
            </Switch>
            <Route path="/dashboard" component={dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
