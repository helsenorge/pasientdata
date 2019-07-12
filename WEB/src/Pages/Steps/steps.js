import React, { Component } from "react";
import TimeButtonGroup from "../../components/TimeButtonGroup/timeButtonGroup";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";
import { connect } from "react-redux";
import NavigationBar from "../../components/NavigationBar/navigationBar.js";
import moment from "moment";
import DateSelector from "../../components/DateSelector/dateSelector";
import ChevronLeftRounded from "@helsenorge/toolkit/components/icons/ChevronLeftRounded";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "week",
      interval: "day",
      format: "ddd",
      start: null,
      end: null,
      setPeriodFromExactDates: false,
      nrOfIntervalsBack: 0
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
        }
      case "hour":
        switch (interval) {
          case "minute":
            return "HH:mm";
          case "hour":
            return "HH:mm";
          default:
            break;
        }
      case "day":
        switch (interval) {
          case "minute":
            return "HH:mm";
          case "hour":
            return "HH:mm";
          case "day":
            return "ddd";
        }
      case "week":
        switch (interval) {
          case "minute":
            return "HH:mm:ss";
          case "hour":
            return "ddd HH:mm";
          case "day":
            return "ddd";
          case "week":
            return "ww";
        }
      case "month":
        switch (interval) {
          case "minute":
            return "HH:mm:ss";
          case "hour":
            return "DD.MM HH:mm";
          case "day":
            return "DD.MM";
          case "week":
            return "ww";
          case "month":
            return "MM";
        }
      case "year":
        switch (interval) {
          case "minute":
            return "MM.DD HH:mm";
          case "hour":
            return "MM.DD HH:mm";
          case "day":
            return "DD.MM";
          case "week":
            return "ww";
          case "month":
            return "MM.YYYY";
          case "year":
            return "YYYY";
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

  onStartChanged = newStart => {
    if (this.state.end !== null) {
      this.setState({ start: newStart, setPeriodFromExactDates: true });
    } else {
      this.setState({ start: newStart });
    }
  };

  onEndChanged = newEnd => {
    if (this.state.start !== null) {
      this.setState({ end: newEnd, setPeriodFromExactDates: true });
    } else {
      this.setState({ end: newEnd });
    }
  };

  formatInterval = interval => {
    switch (interval) {
      case "year":
        return "YYYY";
      case "month":
        return "MM";
      case "week":
        return "w";
      case "day":
        return "DD/MM";
      case "hour":
        return "HH:mm";
      default:
        return "YYYY-MM-DDTHH:mm:ss";
    }
  };

  intervalToString = interval => {
    switch (interval) {
      case "year":
        return "År";
      case "month":
        return "Måned:";
      case "week":
        return "Uke:";
      case "day":
        return "Dag:";
      case "hour":
        return "Kl:";
      default:
        return "Dato:";
    }
  };

  leftClicked = () => {
    this.setState({ nrOfIntervalsBack: this.state.nrOfIntervalsBack + 1 });
  };

  rightClicked = () => {
    if (this.state.nrOfIntervalsBack > 0) {
      this.setState({ nrOfIntervalsBack: this.state.nrOfIntervalsBack - 1 });
    }
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

    let start;
    let end;
    if (this.state.setPeriodFromExactDates) {
      start = this.state.start;
      end = this.state.end;
    } else {
      let startEndTimes = this.getStartEndTimes(
        this.state.view,
        this.state.nrOfIntervalsBack
      );
      start = startEndTimes.start;
      end = startEndTimes.end;
    }

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
        <DateSelector
          startChanged={this.onStartChanged}
          endChanged={this.onEndChanged}
        />
        <div>Interval: </div>
        <TimeButtonGroup
          onClicked={this.clicked}
          buttonClicked={"interval"}
          views={intervalButtons}
          outline={outlineIntervalButtons}
        />
        <button onClick={this.leftClicked}>
          <ChevronLeftRounded />
        </button>{" "}
        <div>
          {this.intervalToString(this.state.interval)}{" "}
          {moment()
            .startOf(this.state.interval)
            .subtract(this.state.nrOfIntervalsBack, this.state.interval)
            .format(this.formatInterval(this.state.interval))}
        </div>
        <button onClick={this.rightClicked}>
          <ChevronRightRounded />{" "}
        </button>
        <BarPlotterV2
          start={start}
          end={end}
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
