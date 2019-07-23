import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";
import VisningsKort from "../../../components/InnsiktsKort/visningsKort";
import CompareDataCard from "../../../components/InnsiktsKort/compareDataCard";
import GoalCard from "../../../components/InnsiktsKort/goalCard";

class Blodtrykk extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar />
        <VisningsKort />
        <OversiktKort datatype="Blodtrykk" />
        <GrafKort datatype="Blodtrykk" />
        <MonsterKort datatype="Blodtrykk" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default Blodtrykk;
