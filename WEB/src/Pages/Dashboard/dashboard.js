import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.css";
import FHIRConnection from "../../FHIRCommunication";
import CardComponent from "../../components/Card/cardComponent";
import blodsukkerContent from "../../components/DashboardContent/blodsukkerContent";
// import PhysicalActivityContent from "../../components/DashboardContent/physicalActivityContent";
// import insulinContent from "../../components/DashboardContent/insulinContent";
// import carbohydratesContent from "../../components/DashboardContent/carbohydratesContent";
import stepsContent from "../../components/DashboardContent/stepsContent";
import weightContent from "../../components/DashboardContent/weightContent";
import AddDataContent from "../../components/DashboardContent/addDataContent";
import changeGoalsContent from "../../components/DashboardContent/changeGoalsContent";
import compareDataContent from "../../components/DashboardContent/compareDataContent";

class Dashboard extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div style={{ margin: "0 4px 8px" }}>
          <h1 style={{ marginLeft: "8px" }}>Innsikt</h1>
          <CardComponent title={"Blodsukker"} content={blodsukkerContent()} />
          <div className="flex-container">
            <CardComponent
              className="dashboard-card"
              title={"Insulin"}
              content={stepsContent(
                this.props.patient.datasets[0].measurements,
                "/insulin"
              )}
            />
            <CardComponent
              className="dashboard-card"
              title={"Skritt"}
              content={stepsContent(
                this.props.patient.datasets[0].measurements,
                "/steps"
              )}
            />
          </div>
          <div
            className="flex-container"
            styles={{
              "margin-left": "8px",
              "margin-top": "8px",
              "margin-right": "8px"
            }}
          >
            <CardComponent
              className="dashboard-card"
              title={"Karbo"}
              content={stepsContent(
                this.props.patient.datasets[0].measurements,
                "/carbohydrates"
              )}
            />
            <CardComponent
              className="dashboard-card"
              title={"Vekt"}
              content={weightContent(
                this.props.patient.datasets[1].measurements,
                "/weight"
              )}
            />
          </div>
          <div className="flex-container">
            <CardComponent
              className="dashboard-card"
              title={"Fysisk aktivitet"}
              content={stepsContent(
                this.props.patient.datasets[0].measurements,
                "/physicalactivity"
              )}
            />
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
