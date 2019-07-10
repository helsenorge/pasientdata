import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard";
import Burgers from "./components/burgers";
import ButtonToolBar from "./components/ButtonGroup";
import Redirecter from "./FHIRconnection/FHIRconnection";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Redirecter} />
            <Route path="/login" component={Redirecter} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/burgers" component={Burgers} />
            <Route path="/steps" component={ButtonToolBar} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
