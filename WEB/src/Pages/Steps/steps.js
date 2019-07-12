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
    this.setState({ format: this.getFormat(view, interval) });
  };

  getFormat = (view, interval) => {
    switch (view) {
      case "minute":
        switch (interval) {
          case "minute":
            return "HH:mm:ss";
          // case "hour":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "day":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "week":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "month":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "year":
          //   return "YYYY-MM-DDTHH:mm:ss";
          default:
            return "YYYY-MM-DDTHH:mm:ss";
        }
      case "hour":
        switch (interval) {
          case "minute":
            return "HH:mm";
          case "hour":
            return "HH:mm";
          // case "day":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "week":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "month":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "year":
          //   return "YYYY-MM-DDTHH:mm:ss";
          default:
            return "YYYY-MM-DDTHH:mm:ss";
        }
      case "day":
        switch (interval) {
          case "minute":
            return "HH:mm";
          case "hour":
            return "HH";
          case "day":
            return "ddd";
          // case "week":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "month":
          //   return "YYYY-MM-DDTHH:mm:ss";
          // case "year":
          //   return "YYYY-MM-DDTHH:mm:ss";
          default:
            return "YYYY-MM-DDTHH:mm:ss";
        }
      case "week":
        switch (interval) {
          case "minute":
            return "HH:mm:ss";
          case "hour":
            return "YYYY-MM-DDTHH:mm:ss";
          case "day":
            return "YYYY-MM-DDTHH:mm:ss";
          case "week":
            return "YYYY-MM-DDTHH:mm:ss";
          case "month":
            return "YYYY-MM-DDTHH:mm:ss";
          case "year":
            return "YYYY-MM-DDTHH:mm:ss";
          default:
            return "YYYY-MM-DDTHH:mm:ss";
        }
      case "month":
        switch (interval) {
          case "minute":
            return "HH:mm:ss";
          case "hour":
            return "YYYY-MM-DDTHH:mm:ss";
          case "day":
            return "YYYY-MM-DDTHH:mm:ss";
          case "week":
            return "YYYY-MM-DDTHH:mm:ss";
          case "month":
            return "YYYY-MM-DDTHH:mm:ss";
          case "year":
            return "YYYY-MM-DDTHH:mm:ss";
          default:
            return "YYYY-MM-DDTHH:mm:ss";
        }
      case "year":
        switch (interval) {
          case "minute":
            return "HH:mm:ss";
          case "hour":
            return "YYYY-MM-DDTHH:mm:ss";
          case "day":
            return "YYYY-MM-DDTHH:mm:ss";
          case "week":
            return "YYYY-MM-DDTHH:mm:ss";
          case "month":
            return "YYYY-MM-DDTHH:mm:ss";
          case "year":
            return "YYYY-MM-DDTHH:mm:ss";
          default:
            return "YYYY-MM-DDTHH:mm:ss";
        }
      default:
        return "YYYY-MM-DDTHH:mm:ss";
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
      minute: this.state.view === "minute",
      hour: this.state.view === "hour",
      day: this.state.view === "day",
      week: this.state.view === "week",
      month: this.state.view === "month",
      year: this.state.view === "year"
    };

    let outlineIntervalButtons = {
      minute: this.state.interval === "minute",
      hour: this.state.interval === "hour",
      day: this.state.interval === "day",
      week: this.state.interval === "week",
      month: this.state.interval === "month",
      year: this.state.interval === "year"
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
