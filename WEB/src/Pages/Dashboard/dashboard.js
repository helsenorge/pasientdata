import React, { Component } from "react";
import { connect } from "react-redux";
import FHIRConnection from "../../FHIRCommunication";
import CardComponent from "../../components/Card/cardComponent";
import blodsukkerContent from "../../components/DashboardContent/blodsukkerContent";
import PhysicalActivityContent from "../../components/DashboardContent/physicalActivityContent";
import insulinContent from "../../components/DashboardContent/insulinContent";
import carbohydratesContent from "../../components/DashboardContent/carbohydratesContent";
import stepsContent from "../../components/DashboardContent/stepsContent";
import weightContent from "../../components/DashboardContent/weightContent";
import "./dashboard.css";
import AddDataContent from "../../components/DashboardContent/addDataContent";
import changeGoalsContent from "../../components/DashboardContent/changeGoalsContent";
import compareDataContent from "../../components/DashboardContent/compareDataContent";

class Dashboard extends Component {
  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div style={{ margin: "0 4px 8px" }}>
          <h1 style={{ "margin-left": "8px" }}>Innsikt</h1>
          <CardComponent title={"Blodsukker"} content={blodsukkerContent()} />
          <div className="flex-container">
            <CardComponent
              className="flex-children"
              title={"Insulin"}
              content={stepsContent(
                this.props.patient.datasets[0].measurements,
                "/insulin"
              )}
            />
            <CardComponent
              className="flex-children"
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
              className="flex-children"
              title={"Karbo"}
              content={stepsContent(
                this.props.patient.datasets[3].measurements,
                "/carbohydrates"
              )}
            />
            <CardComponent
              className="flex-children"
              title={"Vekt"}
              content={stepsContent(
                this.props.patient.datasets[1].measurements,
                "/weight"
              )}
            />
          </div>
          <div className="flex-container">
            <CardComponent
              className="flex-children"
              title={"Fysisk aktivitet"}
              content={stepsContent(
                this.props.patient.datasets[3].measurements,
                "/physicalactivity"
              )}
            />
            <div className="flex-children" style={{ "margin-right": "8px" }} />
          </div>
          <div className="single-flex-container">
            <CardComponent
              className="flex-children"
              content={<AddDataContent />}
            />
          </div>
          <div className="single-flex-container">
            <CardComponent
              className="flex-children"
              title={"Sette nye mål?"}
              content={changeGoalsContent()}
            />
          </div>
          <div className="single-flex-container">
            <CardComponent
              className="flex-children"
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
