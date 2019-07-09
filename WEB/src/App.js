import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import HomePage from "./loginPage/homePage.js";
import fhirlaunch from "./api/fhirlaunch.js";
import Dashboard from "./components/dashboard.js";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Redirecter from "./redirect/redirect";
import Burgers from "./components/burgers";
import ButtonToolBar from "./components/ButtonGroup";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={fhirlaunch} />
            <Route path="/login" component={HomePage} />
            <Route path="/launch" component={fhirlaunch}>
              <Switch>
                <Route path="/redirect" component={Redirecter} />
              </Switch>
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            {/* <Switch> */}
            <Route path="/burgers" component={Burgers} />
            <Route path="/steps" component={ButtonToolBar} />
            {/* </Switch> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
