import React, { Component } from "react";
import NavigationBar from "../../../components/NavigationBar/navigationBar.js";
import OversiktKort from "../../../components/InnsiktsKort/oversiktKort";
import GrafKort from "../../../components/InnsiktsKort/grafKort";
import MonsterKort from "../../../components/InnsiktsKort/monsterKort";

class FysiskAktivitet extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavigationBar />
        <OversiktKort datatype="FysiskAktivitet" />
        <GrafKort datatype="FysiskAktivitet" />
        <MonsterKort datatype="FysiskAktivitet" />
      </div>
    );
  }
}

export default FysiskAktivitet;
