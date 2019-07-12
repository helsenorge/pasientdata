import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Dashboard from "./Pages/Dashboard/dashboard";
import Steps from "./Pages/Steps/steps";
import FHIRCommunication from "./FHIRCommunication";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import MenuBar from "./components/MenuBar/menuBar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={FHIRCommunication} />
            <Route path="/login" component={FHIRCommunication} />
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
