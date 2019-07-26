import React, { Component } from "react";
import { connect } from "react-redux";
import periodFromView from "../../../Utils/periodFromView";
import getStartEndTimes from "../../../Utils/getStartEndTimes";
import getFormat from "../../../Utils/getFormat";
import BarPlotter from "../../Barplotter/barPlotter";

class StepsGraph extends Component {
  graphContent = () => {
    let data = this.props.patient.datasets[0].measurements;
    let { periodName, intervalName } = periodFromView(this.props.baseInfo.view);
    let startEndTimes = getStartEndTimes(
      this.props.baseInfo.view,
      this.props.baseInfo.nrOfIntervalsBack
    );
    let start = startEndTimes.start;
    let end = startEndTimes.end;
    if (
      this.props.baseInfo.view === "custom" &&
      this.props.baseInfo.start !== "" &&
      this.props.baseInfo.end !== ""
    ) {
      start = this.props.baseInfo.start;
      end = this.props.baseInfo.end;
    }
    return (
      <BarPlotter
        start={start}
        end={end}
        interval={intervalName}
        outputFormat={getFormat(periodName, intervalName)}
        data={data}
        color={"#59C3FF"}
      />
    );
  };
  render() {
    return this.graphContent();
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(StepsGraph);
