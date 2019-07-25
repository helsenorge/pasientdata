import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import BarPlotter from "../Barplotter/barPlotter";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import getFormat from "../../Utils/getFormat";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import periodFromView from "../../Utils/periodFromView";
import { connect } from "react-redux";
import PeriodStepper from "../PeriodStepper/periodStepper";

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
      <div>
        <BarPlotter
          start={start}
          end={end}
          interval={intervalName}
          outputFormat={getFormat(periodName, intervalName)}
          data={data}
        />
        <PeriodStepper start={start} end={end} periodName={periodName} />
      </div>
    );
  };
  render() {
    return (
      <div>
        <CardComponent title="Over tid" content={this.graphContent()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(GraphCard);
