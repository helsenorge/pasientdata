import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";
import VisningsKort from "../../../components/InnsiktsKort/visningsKort";
import CompareDataCard from "../../../components/InnsiktsKort/compareDataCard";
import GoalCard from "../../../components/InnsiktsKort/goalCard";

class FysiskAktivitet extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <VisningsKort />
        <OversiktKort datatype="FysiskAktivitet" />
        <GrafKort datatype="FysiskAktivitet" />
        <MonsterKort datatype="FysiskAktivitet" />
        <GoalCard />
        <CompareDataCard />
      </div>
    );
  }
}

export default FysiskAktivitet;
