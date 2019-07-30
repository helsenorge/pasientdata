import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.css";
import FHIRConnection from "../../FHIRCommunication";
import CardComponent from "../../components/Card/cardComponent";
import BlodsukkerContent from "../../components/DashboardContent/blodsukkerContent";
// import PhysicalActivityContent from "../../components/DashboardContent/physicalActivityContent";
// import insulinContent from "../../components/DashboardContent/insulinContent";
// import carbohydratesContent from "../../components/DashboardContent/carbohydratesContent";
import stepsContent from "../../components/DashboardContent/stepsContent";
import weightContent from "../../components/DashboardContent/weightContent";
import physicalActivityContent from "../../components/DashboardContent/physicalActivityContent";
import AddDataContent from "../../components/DashboardContent/addDataContent";
import changeGoalsContent from "../../components/DashboardContent/changeGoalsContent";
import compareDataContent from "../../components/DashboardContent/compareDataContent";
import periodFromView from "../../Utils/periodFromView";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import carbohydratesContent from "../../components/DashboardContent/carbohydratesContent";
import insulinContent from "../../components/DashboardContent/insulinContent";
import DashboardGraphCard from "../../components/DashboardContent/dashboardGraphCard";
import {
  BLOODSUGAR,
  INSULIN,
  STEPS,
  WEIGHT,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES
} from "../../dataTypes";

class Dashboard extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      let { periodName, intervalName } = periodFromView(
        this.props.baseInfo.view
      );
      let { start, end } = getStartEndTimes(
        this.props.baseInfo.view,
        this.props.baseInfo.nrOfIntervalsBack
      );
      return (
        <div style={{ margin: "0 4px 8px" }}>
          <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
          <CardComponent title={"Blodsukker"} content={<BlodsukkerContent />} />
          <div className="flex-container">
            <DashboardGraphCard dataType={INSULIN} />
            <DashboardGraphCard dataType={STEPS} />
            {/* { <CardComponent
              className="dashboard-card"
              title={"Skritt"}
              content={stepsContent(
                this.props.patient.datasets[0].measurements,
                "/steps",
                this.props.patient.goals.StepsGoal
              )}
            /> } */}
          </div>
          <div
            className="flex-container"
            styles={{
              "margin-left": "8px",
              "margin-top": "8px",
              "margin-right": "8px"
            }}
          >
            {/* <CardComponent
              className="dashboard-card"
              title={"Karbo"}
              // content={stepsContent(
              //   this.props.patient.datasets[0].measurements,
              //   "/carbohydrates"
              // )}
              content={carbohydratesContent()}
            /> */}
            <DashboardGraphCard dataType={CARBOHYDRATES} />
            <DashboardGraphCard dataType={WEIGHT} />
            {/* <CardComponent
              className="dashboard-card"
              title={"Vekt"}
              content={weightContent(
                this.props.patient.datasets[1].measurements,
                intervalName,
                periodName,
                this.props.patient.goals.WeightGoal.value
              )}
            /> */}
          </div>
          <div className="flex-container">
            {/* <CardComponent
              className="dashboard-card"
              title={"Fysisk aktivitet"}
              content={physicalActivityContent(
                this.props.patient.datasets[2].measurements,
                "/physicalactivity",
                start,
                end
              )}
            /> */}
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
