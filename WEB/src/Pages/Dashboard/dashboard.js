import React, { Component } from "react";
import { connect } from "react-redux";
import FHIRConnection from "../../FHIRCommunication";
import CardComponent from "../../components/Card/cardComponent";
import blodsukkerContent from "../../components/DashboardContent/blodsukkerContent";
import fysiskAktivitetContent from "../../components/DashboardContent/fysiskAktivitetContent";
import insulinContent from "../../components/DashboardContent/insulinContent";
import karbohydraterContent from "../../components/DashboardContent/karbohydraterContent";
import skrittContent from "../../components/DashboardContent/skrittContent";
import vektContent from "../../components/DashboardContent/vektContent";
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
              content={insulinContent()}
            />
            <CardComponent
              className="flex-children"
              title={"Skritt"}
              content={skrittContent(
                this.props.patient.datasets[0].measurements
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
              content={karbohydraterContent()}
            />
            <CardComponent
              className="flex-children"
              title={"Vekt"}
              content={vektContent()}
            />
          </div>
          <div className="flex-container">
            <CardComponent
              className="flex-children"
              title={"Fysisk aktivitet"}
              content={fysiskAktivitetContent()}
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
