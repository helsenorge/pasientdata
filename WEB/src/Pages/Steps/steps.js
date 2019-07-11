import React, { Component } from "react";
import TimeButtonGroup from "../../components/TimeButtonGroup/timeButtonGroup";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";
import { connect } from "react-redux";
import NavigationBar from "../../components/NavigationBar/navigationBar.js";
import moment from "moment";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "week",
      interval: "day",
      format: "ddd"
    };
  }

  clicked = (buttonType, buttonClicked) => {
    if (buttonType === "view") {
      this.setState({ outline: false, view: buttonClicked });
    } else {
      this.setState({ outline: false, interval: buttonClicked });
    }
  };

  getStartEndTimes = interval => {
    return {
      start: moment()
        .startOf(interval)
        .format("YYYY-MM-DDTHH:mm:ss"),
      end: moment()
        .endOf(interval)
        .format("YYYY-MM-DDTHH:mm:ss")
    };
  };

  render() {
    return (
      <div>
        <NavigationBar />
        <div>View: </div>
        <TimeButtonGroup
          onClicked={this.clicked}
          buttonClicked={"view"}
          views={{
            minute: true,
            hour: true,
            day: true,
            week: true,
            month: true,
            year: true
          }}
        />
        <div>Interval: </div>
        <TimeButtonGroup
          onClicked={this.clicked}
          buttonClicked={"interval"}
          views={{
            minute: true,
            hour: true,
            day: true,
            week: true,
            month: true,
            year: true
          }}
        />
        <BarPlotterV2
          // datasets={this.props.patient.datasets}
          // aggregateLength={this.intervalButtonClicked}
          // timeScope={this.viewButtonClicked}
          // datasetLOINC="55423-8"
          start={this.getStartEndTimes(this.state.view).start}
          end={this.getStartEndTimes(this.state.view).end}
          interval={this.state.interval}
          outputFormat={this.state.format}
          data={this.props.patient.datasets[0].measurements}
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
