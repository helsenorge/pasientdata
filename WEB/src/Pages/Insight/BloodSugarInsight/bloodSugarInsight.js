import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../InsightCards/trendGoalsCard";
import GraphCard from "../InsightCards/graphCard";
import PatternCard from "../InsightCards/patternCard";
import ViewCard from "../InsightCards/viewCard";
import CompareDataCard from "../InsightCards/compareDataCard";
import GoalCard from "../InsightCards/goalCard";
import DateSelectorCard from "../../../components/DateSelectorCard/dateSelectorCard";

import {
  bloodSugarGreatestChange,
  bloodSugarFluctuations
} from "../../../Utils/PatternCalculations/bloodSugarPatterns";
import { connect } from "react-redux";
//import FakeGlucoseData from "../../../Utils/fakeGlucose";
import { BLOODSUGAR } from "../../../dataTypes";

class BloodSugarInsight extends Component {
  render() {
    let fluctuationText = bloodSugarFluctuations;
    let greatestChangeText = bloodSugarGreatestChange;
    if (fluctuationText !== "none" || greatestChangeText !== "none") {
      return (
        <div style={{ margin: "0 0 8px" }}>
          <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
          <NavigationBar />
          <ViewCard />
          <DateSelectorCard />
          <GraphCard datatype={BLOODSUGAR} />
          <TrendGoalsCard datatype="Blodsukker" />
          <PatternCard
            triangle={"up"}
            fluctuation={fluctuationText}
            greatestChange={greatestChangeText}
            dataType={BLOODSUGAR}
            view={"day"}
            goals={this.props.patient.goals}
          />
          <GoalCard />
          <CompareDataCard />
        </div>
      );
    } else {
      return (
        <div style={{ margin: "0 0 8px" }}>
          <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
          <NavigationBar />
          <ViewCard />
          <DateSelectorCard />
          <GraphCard datatype={BLOODSUGAR} />
          <TrendGoalsCard datatype="Blodsukker" />
          <GoalCard />
          <CompareDataCard />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(BloodSugarInsight);
