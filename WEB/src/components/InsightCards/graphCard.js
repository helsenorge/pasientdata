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
    } else if (this.props.datatype === "Vekt") {
      data = this.props.patient.datasets[1].measurements;
    } else if (this.props.datatype === "FysiskAktivitet") {
      data = this.props.patient.datasets[2].measurements;
    } else {
      data = this.props.patient.datasets[0].measurements;
    }
    let { periodName, intervalName } = periodFromView(this.props.baseInfo.view);
    let { start, end } = getStartEndTimes(
      this.props.baseInfo.view,
      this.props.baseInfo.nrOfIntervalsBack
    );
    if (
      this.props.baseInfo.view === "custom" &&
      this.props.baseInfo.start !== "" &&
      this.props.baseInfo.end !== ""
    ) {
      start = this.props.baseInfo.start;
      end = this.props.baseInfo.end;
    }

    return (
      <div>
        <BarPlotter
          start={start}
          end={end}
          interval={intervalName}
          outputFormat={getFormat(periodName, intervalName)}
          data={data}
          color={"#3C7E72"}
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
