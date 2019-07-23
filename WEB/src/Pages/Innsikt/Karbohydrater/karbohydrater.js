import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";
import VisningsKort from "../../../components/InnsiktsKort/visningsKort";
import CompareDataCard from "../../../components/InnsiktsKort/compareDataCard";
import "../innsikt.css";
import GoalCard from "../../../components/InnsiktsKort/goalCard";

class Karbohydrater extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <VisningsKort />
        <OversiktKort datatype="Karbohydrater" />
        <GrafKort datatype="Karbohydrater" />
        <MonsterKort datatype="Karbohydrater" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default Karbohydrater;
