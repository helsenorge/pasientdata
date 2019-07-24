import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InsightCards/trendGoalsCard";
import GraphCard from "../../../components/InsightCards/graphCard";
import MonsterKort from "../../../components/InsightCards/patternCard";
import ViewCard from "../../../components/InsightCards/viewCard";
import CompareDataCard from "../../../components/InsightCards/compareDataCard";
import GoalCard from "../../../components/InsightCards/goalCard";

class Blodtrykk extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <ViewCard />
        <OversiktKort datatype="Blodtrykk" />
        <GraphCard datatype="Blodtrykk" />
        <MonsterKort datatype="Blodtrykk" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default Blodtrykk;
