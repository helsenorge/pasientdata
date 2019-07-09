import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import dashboard from "./components/dashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";
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
            <Route path="/redirect" component={Redirecter} />
            <Route path="/dashboard" component={dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
