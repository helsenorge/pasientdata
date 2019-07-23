import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboard";
import Steps from "./Pages/Steps/steps";
import Blodsukker from "./Pages/Innsikt/Blodsukker/blodsukker";
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
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.baseInfo.isLoggedin && <MenuBar />}
        <Switch>
          <Route exact path="/" component={FHIRCommunication} />
          <Route path="/login" component={FHIRCommunication} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/blodsukker" component={Blodsukker} />
          <Route path="/insulin" component={Insulin} />
          <Route path="/skritt" component={Steps} />
          <Route path="/vekt" component={Vekt} />
          <Route path="/blodtrykk" component={Blodtrykk} />
          <Route path="/karbohydrater" component={Karbohydrater} />
          <Route path="/fysiskAktivitet" component={FysiskAktivitet} />
          <Route path="/comparedata" component={CompareData} />
          <Route path="/mygoals" component={MyGoals} />
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
