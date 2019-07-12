import React, { Component, Fragment } from "react";
import NavigationBar from "../../components/NavigationBar/navigationBar";
import SideBar from "../../components/Sidebar/sidebar";
import "../../components/Sidebar/sidebar.css";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";
import { connect } from "react-redux";
import { onLoggedIn, addInfo } from "../../Redux/actions";
import FHIRConnection from "../../FHIRCommunication";
import CardComponent from "../../components/Card/cardComponent";
import blodsukkerContent from "../../components/DashboardContent/blodsukkerContent";
import fysiskAktivitetContent from "../../components/DashboardContent/fysiskAktivitetContent";
import insulinContent from "../../components/DashboardContent/insulinContent";
import karbohydraterContent from "../../components/DashboardContent/karbohydraterContent";
import skrittContent from "../../components/DashboardContent/skrittContent";
import vektContent from "../../components/DashboardContent/vektContent";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.loggedOut = this.loggedOut.bind(this);
  }
  loggedOut() {
    sessionStorage.removeItem("googleResponse");
    this.props.onLoggedIn(false);
  }

  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div>
          {/* <div>
            <NavigationBar />
          </div>

          <br /> */}
          <h1>Innsikt</h1>
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
              content={skrittContent()}
            />
          </div>
          <div className="flex-container">
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
          </div>
          <button onClick={() => this.loggedOut()} variant="danger">
            Logg ut
          </button>
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

const mapDispatchToProps = { onLoggedIn, addInfo };

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
