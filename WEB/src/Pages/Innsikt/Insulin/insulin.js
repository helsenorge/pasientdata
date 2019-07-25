import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../../../components/InsightCards/trendGoalsCard";
import GraphCard from "../../../components/InsightCards/graphCard";
import PatternCard from "../../../components/InsightCards/patternCard";
import ViewCard from "../../../components/InsightCards/viewCard";
import CompareDataCard from "../../../components/InsightCards/compareDataCard";
import GoalCard from "../../../components/InsightCards/goalCard";
import {
  bloodSugarGreatestChange,
  bloodSugarFluctuations
} from "../../../Utils/PatternCalculations/bloodSugarPatterns";
import FakeGlucoseData from "../../../Utils/fakeGlucose";
import { connect } from "react-redux";

class Insulin extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
        <NavigationBar />
        <ViewCard />
        <TrendGoalsCard datatype="Insulin" />
        <GraphCard datatype="Insulin" />
        <PatternCard
          datatype="Insulin"
          trianglePic={require("../../../Images/pinkUpTriangle.svg")}
          fluctuation={"none"}
          greatestChange={"none"}
          data={FakeGlucoseData()}
          view={this.props.baseInfo.view}
          goals={this.props.patient.goals}
        />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(Insulin);
