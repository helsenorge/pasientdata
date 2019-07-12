import React, { Component } from "react";
import TimeButtonGroup from "../../components/TimeButtonGroup/timeButtonGroup";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";
import { connect } from "react-redux";
import NavigationBar from "../../components/NavigationBar/navigationBar.js";
import moment from "moment";
import DateSelector from "../../components/DateSelector/dateSelector";

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
    let view = this.state.view;
    let interval = this.state.interval;
    if (buttonType === "view") {
      this.setState({ view: buttonClicked });
      view = buttonClicked;
    } else {
      this.setState({ interval: buttonClicked });
      interval = buttonClicked;
    }

    if (view === "hour" && interval === "minute") {
      this.setState({ format: "HH:mm" });
    }
    if (view === "week" && interval === "hour") {
      this.setState({ format: "HH" });
    }
  };

  getStartEndTimes = (interval, nrOfIntervalsBack) => {
    return {
      start: moment()
        .startOf(interval)
        .subtract(nrOfIntervalsBack, interval)
        .format("YYYY-MM-DDTHH:mm:ss"),
      end: moment()
        .endOf(interval)
        .subtract(nrOfIntervalsBack, interval)
        .format("YYYY-MM-DDTHH:mm:ss")
    };
  };

  render() {
    // console.log(!(this.state.interval === "minute"));
    //console.log(this.state.interval);
    let viewButtons = {
      minute: true,
      hour: true,
      day: true,
      week: true,
      month: true,
      year: true
    };

    let intervalButtons = {
      minute: true,
      hour: true,
      day: true,
      week: true,
      month: true,
      year: true
    };

    let outlineViewButtons = {
      minute: !(this.state.view === "minute"),
      hour: !(this.state.view === "hour"),
      day: !(this.state.view === "day"),
      week: !(this.state.view === "week"),
      month: !(this.state.view === "month"),
      year: !(this.state.view === "year")
    };

    let outlineIntervalButtons = {
      minute: !(this.state.interval === "minute"),
      hour: !(this.state.interval === "hour"),
      day: !(this.state.interval === "day"),
      week: !(this.state.interval === "week"),
      month: !(this.state.interval === "month"),
      year: !(this.state.interval === "year")
    };

    return (
      <div>
        <NavigationBar />
        <div>View: </div>
        <TimeButtonGroup
          onClicked={this.clicked}
          buttonClicked={"view"}
          views={viewButtons}
          outline={outlineViewButtons}
        />
        <DateSelector />
        <div>Interval: </div>
        <TimeButtonGroup
          onClicked={this.clicked}
          buttonClicked={"interval"}
          views={intervalButtons}
          outline={outlineIntervalButtons}
        />
        <BarPlotterV2
          // datasets={this.props.patient.datasets}
          // aggregateLength={this.intervalButtonClicked}
          // timeScope={this.viewButtonClicked}
          // datasetLOINC="55423-8"
          start={this.getStartEndTimes(this.state.view, 0).start}
          end={this.getStartEndTimes(this.state.view, 0).end}
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
