import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";

class Blodsukker extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar />
        <OversiktKort datatype="Blodsukker" />
        <GrafKort datatype="Blodsukker" />
        <MonsterKort datatype="Blodsukker" />
      </div>
    );
  }
}

export default Blodsukker;
