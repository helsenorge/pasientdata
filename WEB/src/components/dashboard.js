import React, { Component, Fragment } from "react";
import NavigationBar from "./navigationBar.js";
import SideBar from "./sidebar";
import "./sidebar.css";
import BarPlotter from "../components/barPlotter";
import { connect } from "react-redux";
import { onLoggedIn, addInfo } from "../redux/actions";
import FHIRConnection from "../FHIRconnection/FHIRconnection";

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
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <NavigationBar />
          <BarPlotter
            datasets={this.props.patient.datasets}
            aggregateLength="day"
            timeScope="week"
            datasetLOINC="55423-8"
          />
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
