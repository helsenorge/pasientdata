import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";

class Karbohydrater extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar />
        <OversiktKort datatype="Karbohydrater" />
        <GrafKort datatype="Karbohydrater" />
        <MonsterKort datatype="Karbohydrater" />
      </div>
    );
  }
}

export default Karbohydrater;
