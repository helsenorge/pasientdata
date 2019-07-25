import React, { Component } from "react";
import formatInterval from "../../Utils/formatInterval";
import intervalToString from "../../Utils/intervalToString";
import periodFromView from "../../Utils/periodFromView";
import { connect } from "react-redux";
import { setNrOfIntervalsBack } from "../../Redux/actions";
import ChevronLeftRounded from "@helsenorge/toolkit/components/icons/ChevronLeftRounded";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import moment from "moment";

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
    let intervalName = periodFromView(this.props.baseInfo.view);
    return (
      <div className="flex-container">
        <button className="flex-children" onClick={this.leftClicked}>
          <ChevronLeftRounded />
        </button>{" "}
        <div className="flex-children">
          {intervalToString(intervalName)}{" "}
          {moment()
            .startOf(intervalName)
            .subtract(this.props.baseInfo.nrOfIntervalsBack, intervalName)
            .format(formatInterval(intervalName))}
        </div>
        <button className="flex-children" onClick={this.rightClicked}>
          <ChevronRightRounded />{" "}
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
