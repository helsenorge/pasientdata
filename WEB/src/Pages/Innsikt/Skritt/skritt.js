import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../../../components/InsightCards/trendGoalsCard";
import GraphCard from "../../../components/InsightCards/graphCard";
import PatternCard from "../../../components/InsightCards/patternCard";
import ViewCard from "../../../components/InsightCards/viewCard";
import CompareDataCard from "../../../components/InsightCards/compareDataCard";
import GoalCard from "../../../components/InsightCards/goalCard";
import { stepsGreatestPeriod } from "../../../Utils/PatternCalculations/stepsPatterns";
import { connect } from "react-redux";
import DateSelectorCard from "../../../components/DateSelectorCard/dateSelectorCard";

class Skritt extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
        <NavigationBar />
        <ViewCard />
        <DateSelectorCard />
        <TrendGoalsCard datatype="Skritt" />
        <GraphCard datatype="Skritt" />
        <PatternCard
          datatype="Skritt"
          trianglePic={require("../../../Images/pinkUpTriangle.svg")}
          fluctuation={"none"}
          greatestChange={stepsGreatestPeriod}
          data={this.props.patient.datasets[0].measurements}
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

export default connect(mapStateToProps)(Skritt);
