import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.css";
import FHIRConnection from "../../FHIRCommunication";
import CardComponent from "../../components/Card/cardComponent";
import BloodSugarContent from "./DashboardContent/bloodSugarContent";
import AddDataContent from "./DashboardContent/addDataContent";
import changeGoalsContent from "./DashboardContent/changeGoalsContent";
import compareDataContent from "./DashboardContent/compareDataContent";
import DashboardGraphCard from "./DashboardContent/dashboardGraphCard";
import {
  BLOODSUGAR,
  INSULIN,
  STEPS,
  WEIGHT,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES
} from "../../dataTypes";

/*
 * The main page of the project, giving a summary of each data source, with links to each data source's
 * insight page. Also contains links to the goal page and the compare data page, as well as a currently
 * not working link to add more data sources. As with all the pages it has the menu bar at the top for
 * easy navigation.
 */

class Dashboard extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div style={{ margin: "0 4px 8px" }}>
          <div className="insight-header">
            <h1 className="header-container">Innsikt</h1>
            <div className="status-container">
              Viser status fra siste 7 dager
            </div>
          </div>

          <CardComponent title={"Blodsukker"} content={<BloodSugarContent />} />
          <div className="flex-container">
            <DashboardGraphCard dataType={INSULIN} />
            <DashboardGraphCard dataType={STEPS} />
          </div>
          <div
            className="flex-container"
            styles={{
              "margin-left": "8px",
              "margin-top": "8px",
              "margin-right": "8px"
            }}
          >
            <DashboardGraphCard dataType={CARBOHYDRATES} />
            <DashboardGraphCard dataType={WEIGHT} />
          </div>
          <div className="flex-container">
            <DashboardGraphCard dataType={PHYSICAL_ACTIVITY} />
            <div className="flex-children" style={{ marginRight: "8px" }} />
          </div>
          <div className="single-flex-container">
            <CardComponent content={<AddDataContent />} />
          </div>
          <div className="single-flex-container">
            <CardComponent
              title={"Sette nye mål?"}
              content={changeGoalsContent()}
            />
          </div>
          <div className="single-flex-container">
            <CardComponent
              title={"Forstå din data"}
              content={compareDataContent()}
            />
          </div>
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

export default connect(mapStateToProps)(Dashboard);
