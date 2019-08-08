import React, { Component } from "react";
import { connect } from "react-redux";
import "./myGoalsPage.css";
import GoalContent from "./GoalContent/goalContent";
import FHIRConnection from "../../FHIRCommunication";

/*
 * Page showing the different goals and current status towards those goals, as well
 * as a button that lets you change them.
 */

class MyGoals extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div>
          <div className="insight-header">
            <h1 className="header-container">Sett mål</h1>
            <div className="status-container">
              Viser status fra siste 7 dager
            </div>
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
