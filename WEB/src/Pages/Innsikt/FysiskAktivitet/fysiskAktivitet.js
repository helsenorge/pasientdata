import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../../../components/InsightCards/trendGoalsCard";
import GraphCard from "../../../components/InsightCards/graphCard";
import MonsterKort from "../../../components/InsightCards/patternCard";
import ViewCard from "../../../components/InsightCards/viewCard";
import CompareDataCard from "../../../components/InsightCards/compareDataCard";
import GoalCard from "../../../components/InsightCards/goalCard";

class FysiskAktivitet extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <ViewCard />
        <TrendGoalsCard datatype="FysiskAktivitet" />
        <GraphCard datatype="FysiskAktivitet" />
        <MonsterKort datatype="FysiskAktivitet" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default FysiskAktivitet;
