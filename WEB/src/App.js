import React, { Component } from "react";
import "./styles.css";
import dashboard from "./components/dashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Redirecter from "./redirect/redirect";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Redirecter} />
            <Switch>
              <Route path="/redirect" component={Redirecter} />
            </Switch>
            <Route path="/dashboard" component={dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
