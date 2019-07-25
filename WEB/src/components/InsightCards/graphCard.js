import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import BarPlotter from "../Barplotter/barPlotter";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import getFormat from "../../Utils/getFormat";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import periodFromView from "../../Utils/periodFromView";
import { connect } from "react-redux";

class GraphCard extends Component {
  graphContent = () => {
    let data;
    if (this.props.datatype === "Blodsukker") {
      data = FakeGlucoseData();
    } else {
      data = this.props.patient.datasets[0].measurements;
    }
    let startEndTimes = getStartEndTimes(
      this.props.baseInfo.view,
      this.props.baseInfo.nrOfIntervalsBack
    );
    let start = startEndTimes.start;
    let end = startEndTimes.end;
    let { periodName, intervalName } = periodFromView(this.props.baseInfo.view);
    return (
      <BarPlotter
        start={start}
        end={end}
        interval={intervalName}
        outputFormat={getFormat(periodName, intervalName)}
        data={data}
      />
    );
  };
  render() {
    return <CardComponent title="Over tid" content={this.graphContent()} />;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(GraphCard);
