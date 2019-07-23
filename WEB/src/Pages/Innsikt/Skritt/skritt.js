import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";
import VisningsKort from "../../../components/InnsiktsKort/visningsKort";
import SammenlignDataKort from "../../../components/InnsiktsKort/sammenlignDataKort";
import GoalCard from "../../../components/InnsiktsKort/goalCard";

class Skritt extends Component {
  state = {};
  render() {
    return (
      <div style={{ margin: "0 0 8px" }}>
        <NavigationBar />
        <VisningsKort />
        <OversiktKort datatype="Skritt" />
        <GrafKort datatype="Skritt" />
        <MonsterKort datatype="Skritt" />
        <GoalCard />
        <SammenlignDataKort />
      </div>
    );
  }
}

export default Skritt;
