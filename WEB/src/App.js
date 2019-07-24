import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboard";
import Steps from "./Pages/Steps/steps";
import Blodsukker from "./Pages/Innsikt/Blodsukker/blodsukker";
import Skritt from "./Pages/Innsikt/Skritt/skritt";
import Insulin from "./Pages/Innsikt/Insulin/insulin";
import Vekt from "./Pages/Innsikt/Vekt/vekt";
import Blodtrykk from "./Pages/Innsikt/Blodtrykk/blodtrykk";
import Karbohydrater from "./Pages/Innsikt/Karbohydrater/karbohydrater";
import FysiskAktivitet from "./Pages/Innsikt/FysiskAktivitet/fysiskAktivitet";
import MyGoals from "./Pages/MyGoalsPage/myGoalsPage";
import CompareData from "./Pages/CompareDataPage/compareDataPage";

import FHIRCommunication from "./FHIRCommunication";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import MenuBar from "./components/MenuBar/menuBar";
import StartFromTop from "./StartFromTop";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <StartFromTop>
          {this.props.baseInfo.isLoggedin && <MenuBar />}
          <Switch>
            <Route exact path="/" component={FHIRCommunication} />
            <Route path="/login" component={FHIRCommunication} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/bloodsugar" component={Blodsukker} />
            <Route path="/insulin" component={Insulin} />
            <Route path="/steps" component={Skritt} />
            <Route path="/weight" component={Vekt} />
            <Route path="/bloodpressure" component={Blodtrykk} />
            <Route path="/carbohydrates" component={Karbohydrater} />
            <Route path="/physicalactivity" component={FysiskAktivitet} />
            <Route path="/comparedata" component={CompareData} />
            <Route path="/mygoals" component={MyGoals} />
            <Route path="/steps" component={Steps} />
            <Route
              render={() => {
                return <NotFoundPage />;
              }}
            />
          </Switch>
        </StartFromTop>
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
