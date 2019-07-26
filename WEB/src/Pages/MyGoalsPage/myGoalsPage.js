import React, { Component } from "react";
import { connect } from "react-redux";
import "./myGoalsPage.css";
import CardComponent from "../../components/Card/cardComponent";
import GoalContent from "../../components/GoalContent/goalContent";

class MyGoals extends Component {
  render() {
    return (
      <div>
        <div className="row headtStyle">
          <h1 className="h1Style">Sett mål</h1>
          <div className="breadText">Viser status fra siste to uker</div>
        </div>
        <GoalContent datatype="Blodsukker" title="Blodsukker: Tid innenfor grenseverdi" />
        <GoalContent datatype="BlodsukkerAvg" title="Blodsukker: Gjennomsnittlig nivå" />
        <GoalContent datatype="Skritt" title="Skritt" />
        <GoalContent datatype="Vekt" title="Vekt" />
        <GoalContent datatype="FysiskAktivitet" title="Fysisk aktivitet" />
        <GoalContent datatype="Karbohydrater" title="Karbohydrater" />
        <GoalContent datatype="Blodtrykk" title="Blodtrykk" />

        {/* <CardComponent title={"Blodsukker: Tid innenfor grenseverdi"} content={goalContent()} />
        <CardComponent title={"Blodsukker: Gjennomsnittlig nivå"} content={goalContent()} />
        <CardComponent title={"Skritt"} content={goalContent()} />
        <CardComponent title={"Vekt"} content={goalContent()} />
        <CardComponent title={"Fysisk aktivitet"} content={goalContent()} />
        <CardComponent title={"Karbohydrater"} content={goalContent()} />
        <CardComponent title={"Blodtrykk"} content={goalContent()} /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(MyGoals);