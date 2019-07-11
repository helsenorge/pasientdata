import React, { Component, Fragment } from "react";
import NavigationBar from "../../components/NavigationBar/navigationBar";
import SideBar from "../../components/Sidebar/sidebar";
import "../../components/Sidebar/sidebar.css";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";
import { connect } from "react-redux";
import { onLoggedIn, addInfo } from "../../Redux/actions";
import FHIRConnection from "../../FHIRCommunication";

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
          <div>
            <NavigationBar />
          </div>
          <div>
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>
          {/* <BarPlotter
            datasets={this.props.patient.datasets}
            aggregateLength="day"
            timeScope="week"
            datasetLOINC="55423-8"
          /> */}
          <br />
          <BarPlotterV2
            start={"2019-06-29T16:00:00"}
            end={"2019-06-30T19:30:00"}
            interval="hour"
            outputFormat="HH:mm"
            data={this.props.patient.datasets[0].measurements}
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
