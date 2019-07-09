import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import Dashboard from "./components/dashboard";
import HomePage from "./loginPage/loginPage";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Burgers from "./components/burgers";
import ButtonToolBar from "./components/ButtonGroup";
import Redirecter from "./FHIRconnection/FHIRconnection";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Redirecter} />
            <Route path="/login" component={HomePage}>
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
      </Provider>
    );
  }
}

export default App;
