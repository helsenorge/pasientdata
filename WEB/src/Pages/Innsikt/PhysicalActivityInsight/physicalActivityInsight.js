import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../../../components/InsightCards/trendGoalsCard";
import GraphCard from "../../../components/InsightCards/graphCard";
import PatternCard from "../../../components/InsightCards/patternCard";
import ViewCard from "../../../components/InsightCards/viewCard";
import CompareDataCard from "../../../components/InsightCards/compareDataCard";
import GoalCard from "../../../components/InsightCards/goalCard";
import { connect } from "react-redux";
import DateSelectorCard from "../../../components/DateSelectorCard/dateSelectorCard";
import FHIRConnection from "../../../FHIRCommunication";
import {PHYSICAL_ACTIVITY} from "../../../dataTypes";

class PhysicalActivityInsight extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div style={{ margin: "0 0 8px" }}>
          <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
          <NavigationBar />
          <ViewCard />
          <DateSelectorCard />
          <GraphCard datatype={PHYSICAL_ACTIVITY} />
          <TrendGoalsCard datatype="FysiskAktivitet" />
          <PatternCard
            datatype="FysiskAktivitet"
            triangle={"up"}
            fluctuation={"none"}
            greatestChange={"none"}
            data={this.props.patient.datasets[2].measurements}
            view={this.props.baseInfo.view}
            goals={this.props.patient.goals}
          />
          <GoalCard />
          <CompareDataCard />
        </div>
      );
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

export default connect(mapStateToProps)(PhysicalActivityInsight);
