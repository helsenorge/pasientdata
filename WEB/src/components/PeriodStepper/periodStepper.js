import React, { Component } from "react";
import formatPeriod from "../../Utils/formatPeriod";
import intervalToString from "../../Utils/intervalToString";
import periodFromView from "../../Utils/periodFromView";
import { connect } from "react-redux";
import { setNrOfIntervalsBack } from "../../Redux/actions";
import ChevronLeftRounded from "@helsenorge/toolkit/components/icons/ChevronLeftRounded";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import moment from "moment";
import "./periodStepper.css";

class PeriodStepper extends Component {
  leftClicked = () => {
    let value = parseInt(this.props.baseInfo.nrOfIntervalsBack) + 1;
    this.props.setNrOfIntervalsBack(value.toString());
  };

  rightClicked = () => {
    if (this.props.baseInfo.nrOfIntervalsBack > 0) {
      let value = parseInt(this.props.baseInfo.nrOfIntervalsBack) - 1;
      this.props.setNrOfIntervalsBack(value.toString());
    }
  };
  render() {
    let { periodName, periodNumber } = periodFromView(this.props.baseInfo.view);
    let text;
    if (periodName === "custom") {
      text =
        moment(this.props.start, "YYYY-MM-DDTHH:mm:ss").format("dd.MM.YYYY") +
        " - " +
        moment(this.props.end, "YYYY-MM-DDTHH:mm:ss").format("dd.MM.YYYY");
    } else {
      if (this.props.baseInfo.nrOfIntervalsBack === 0) {
        if (periodNumber === 1) {
          text = "siste " + intervalToString(periodName);
        } else {
          text = "siste " + periodNumber + " " + intervalToString(periodName);
        }
      } else {
        if (periodNumber === 1) {
          text =
            intervalToString(periodName) +
            " " +
            moment()
              .subtract(this.props.baseInfo.nrOfIntervalsBack, periodName)
              .format(formatPeriod(periodName));
        } else {
          text =
            intervalToString(periodName) +
            " " +
            moment()
              .subtract(
                this.props.baseInfo.nrOfIntervalsBack + periodNumber - 1,
                periodName
              )
              .format(formatPeriod(periodName)) +
            " - " +
            intervalToString(periodName) +
            " " +
            moment()
              .subtract(this.props.baseInfo.nrOfIntervalsBack, periodName)
              .format(formatPeriod(periodName));
        }
      }
    }

    return (
      <div className="flex-container">
        <button
          className="flex-children datestepper-button"
          onClick={this.leftClicked}
        >
          <ChevronLeftRounded className="datestepper-chevron" />
        </button>{" "}
        <div className="flex-children datestepper-text">{text}</div>
        <button
          className="flex-children datestepper-button"
          onClick={this.rightClicked}
        >
          <ChevronRightRounded className="datestepper-chevron" />{" "}
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = { setNrOfIntervalsBack };

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodStepper);
