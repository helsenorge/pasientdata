import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from "./Pages/Dashboard/dashboard";
import Steps from "./Pages/Steps/steps";
import FHIRCommunication from "./FHIRCommunication";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import MenuBar from "./components/MenuBar/menuBar";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.baseInfo.isLoggedin && <MenuBar />}
        <Switch>
          <Route exact path="/" component={FHIRCommunication} />
          <Route path="/login" component={FHIRCommunication} />
          <Route path="/steps" component={Steps} />
          <Route path="/dashboard" component={Dashboard} />
          <Route
            render={() => {
              return <NotFoundPage />;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(App);
