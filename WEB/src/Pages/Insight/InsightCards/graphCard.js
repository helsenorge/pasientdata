import React, { Component } from "react";
import CardComponent from "../../../components/Card/cardComponent";
import getStartEndTimes from "../../../Utils/getStartEndTimes";
import periodFromView from "../../../Utils/periodFromView";
import { connect } from "react-redux";
import PeriodStepper from "../../../components/PeriodStepper/periodStepper";
import InsightGraph from "./insightGraph";
import { getAggregatedDataForDataType } from "../../../Utils/aggregatedDataForDataType";

class GraphCard extends Component {
  graphContent = () => {
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
    const aggregatedData = getAggregatedDataForDataType(
      this.props.baseInfo,
      this.props.patient.datasets,
      this.props.datatype,
      "insight"
    );

    return (
      <div>
        <InsightGraph
          aggregatedData={aggregatedData}
          dataType={this.props.datatype}
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
