import React, { Component } from "react";
import { connect } from "react-redux";
import "./myGoalsPage.css";
import GoalContent from "./GoalContent/goalContent";
import FHIRConnection from "../../FHIRCommunication";

class MyGoals extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div>
          <div className="row headtStyle">
            <h1 className="h1Style">Sett mål</h1>
            <div className="breadText">Viser status fra siste to uker</div>
          </div>
          <GoalContent
            datatype="Blodsukker"
            title="Blodsukker: Tid innenfor grenseverdi"
          />
          <GoalContent
            datatype="BlodsukkerAvg"
            title="Blodsukker: Gjennomsnittlig nivå"
          />
          <GoalContent datatype="Skritt" title="Skritt" />
          <GoalContent datatype="Vekt" title="Vekt" />
          <GoalContent datatype="FysiskAktivitet" title="Fysisk aktivitet" />
          <GoalContent datatype="Karbohydrater" title="Karbohydrater" />
          {/* <GoalContent datatype="Blodtrykk" title="Blodtrykk" /> */}
        </div>
      );
    } else {
      return (
        <div>
          <FHIRConnection />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(MyGoals);
