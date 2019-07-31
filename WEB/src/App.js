import React, { Component } from "react";
import "./master.css";
import "./min-helse.css";
import "./styles.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboard";
import BloodSugarInsight from "./Pages/Insight/BloodSugarInsight/bloodSugarInsight";
import StepInsight from "./Pages/Insight/StepInsight/stepInsight";
import InsulinInsight from "./Pages/Insight/InsulinInsight/insulinInsight";
import WeightInsight from "./Pages/Insight/WeightInsight/weightInsight";
import CarbohydrateInsight from "./Pages/Insight/CarbohydrateInsight/carbohydrateInsight";
import PhysicalActivityInsight from "./Pages/Insight/PhysicalActivityInsight/physicalActivityInsight";
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
            <Route path="/bloodsugar" component={BloodSugarInsight} />
            <Route path="/insulin" component={InsulinInsight} />
            <Route path="/steps" component={StepInsight} />
            <Route path="/weight" component={WeightInsight} />
            <Route path="/carbohydrates" component={CarbohydrateInsight} />
            <Route
              path="/physicalactivity"
              component={PhysicalActivityInsight}
            />
            <Route path="/comparedata" component={CompareData} />
            <Route path="/mygoals" component={MyGoals} />
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
