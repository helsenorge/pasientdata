import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";

class Blodtrykk extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar />
        <OversiktKort datatype="Blodtrykk" />
        <GrafKort datatype="Blodtrykk" />
        <MonsterKort datatype="Blodtrykk" />
      </div>
    );
  }
}

export default Blodtrykk;
