import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";

class Vekt extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar />
        <OversiktKort datatype="Vekt" />
        <GrafKort datatype="Vekt" />
        <MonsterKort datatype="Vekt" />
      </div>
    );
  }
}

export default Vekt;
