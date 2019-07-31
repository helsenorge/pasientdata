import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../InsightCards/trendGoalsCard";
import GraphCard from "../InsightCards/graphCard";
import PatternCard from "../InsightCards/patternCard";
import ViewCard from "../InsightCards/viewCard";
import CompareDataCard from "../InsightCards/compareDataCard";
import GoalCard from "../InsightCards/goalCard";
import "../innsikt.css";
import FakeGlucoseData from "../../../Utils/fakeGlucose";
import { connect } from "react-redux";
import DateSelectorCard from "../../../components/DateSelectorCard/dateSelectorCard";
import FHIRConnection from "../../../FHIRCommunication";
import { CARBOHYDRATES } from "../../../dataTypes";

class CarbohydrateInsight extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      let fluctuationText = "none";
      let greatestChangeText = "none";
      if (fluctuationText !== "none" || greatestChangeText !== "none") {
        return (
          <div style={{ margin: "0 0 8px" }}>
            <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
            <NavigationBar />
            <ViewCard />
            <DateSelectorCard />
            <GraphCard datatype={CARBOHYDRATES} />
            <TrendGoalsCard datatype="Karbohydrater" />
            <PatternCard
              datatype="Karbohydrater"
              triangle={"down"}
              fluctuation={fluctuationText}
              greatestChange={greatestChangeText}
              data={FakeGlucoseData()}
              view={this.props.baseInfo.view}
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
            <GraphCard datatype={CARBOHYDRATES} />
            <TrendGoalsCard datatype="Karbohydrater" />
            <GoalCard />
            <CompareDataCard />
          </div>
        );
      }
    } else {
      return (
        <div>
          <FHIRConnection />
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

export default connect(mapStateToProps)(CarbohydrateInsight);
