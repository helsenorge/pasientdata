import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";
import VisningsKort from "../../../components/InnsiktsKort/visningsKort";
import CompareDataCard from "../../../components/InnsiktsKort/compareDataCard";
import GoalCard from "../../../components/InnsiktsKort/goalCard";

class Blodsukker extends Component {
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <VisningsKort />
        <OversiktKort datatype="Blodsukker" />
        <GrafKort datatype="Blodsukker" />
        <MonsterKort datatype="Blodsukker" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default Blodsukker;
