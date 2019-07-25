import React, { Component } from "react";
import { connect } from "react-redux";
import "./myGoalsPage.css";
import CardComponent from "../../components/Card/cardComponent";
import bloodPressureContent from "../../components/GoalContent/BloodPressureContent";
import stepsContent from "../../components/DashboardContent/stepsContent";

class MyGoals extends Component {
  render() {
    return (
      <div>
        <div className="row headtStyle">
          <h1 className="h1Style">Sett mål</h1>
          <div className="breadText">Viser status fra siste to uker</div>
        </div>
        <CardComponent title={"Blodsukker: Tid innenfor grenseverdi"} content={bloodPressureContent()} />
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