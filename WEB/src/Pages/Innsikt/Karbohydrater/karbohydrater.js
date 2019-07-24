import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import TrendGoalsCard from "../../../components/InsightCards/trendGoalsCard";
import GraphCard from "../../../components/InsightCards/graphCard";
import PatternCard from "../../../components/InsightCards/patternCard";
import ViewCard from "../../../components/InsightCards/viewCard";
import CompareDataCard from "../../../components/InsightCards/compareDataCard";
import GoalCard from "../../../components/InsightCards/goalCard";
import "../innsikt.css";

class Karbohydrater extends Component {
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <ViewCard />
        <TrendGoalsCard datatype="Karbohydrater" />
        <GraphCard datatype="Karbohydrater" />
        <PatternCard datatype="Karbohydrater" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default Karbohydrater;
