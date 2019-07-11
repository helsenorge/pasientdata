import React, { Component } from "react";
import TimeButtonGroup from "../../components/TimeButtonGroup/timeButtonGroup";
import BarPlotter from "../../components/Barplotter/barPlotter";
import { connect } from "react-redux";
import NavigationBar from "../../components/NavigationBar/navigationBar.js";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewButtonClicked: "week",
      intervalButtonClicked: "day"
    };
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div>View: </div>
        <TimeButtonGroup onClicked={this.clicked} buttonClicked={"view"} />
        <div>Interval: </div>
        <TimeButtonGroup onClicked={this.clicked} buttonClicked={"interval"} />
        <BarPlotter
          datasets={this.props.patient.datasets}
          aggregateLength={this.intervalButtonClicked}
          timeScope={this.viewButtonClicked}
          datasetLOINC="55423-8"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient
  };
}

export default connect(mapStateToProps)(Steps);
