import React, { Component } from "react";
import NavigationBar from "../../components/NavigationBar/navigationBar";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";
import { connect } from "react-redux";
import FHIRConnection from "../../FHIRCommunication";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.baseInfo.isLoggedin) {
      return (
        <div>
          <div>
            <NavigationBar />
          </div>
          <br />
          <BarPlotterV2
            start={"2019-06-29T16:00:00"}
            end={"2019-06-30T19:30:00"}
            interval="hour"
            outputFormat="HH:mm"
            data={this.props.patient.datasets[0].measurements}
          />
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
