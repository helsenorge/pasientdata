import React, { Component } from "react";
import moment from "moment";
import CardComponent from "../../../components//Card/cardComponent";
import { connect } from "react-redux";
import { XAxis, BarChart, ResponsiveContainer } from "recharts";
import PeriodStepper from "../../../components/PeriodStepper/periodStepper";
import periodFromView from "../../../Utils/periodFromView";
import aggregateData from "../../../Utils/aggregateData";
import getStartEndTimes from "../../../Utils/getStartEndTimes";
import getFormat from "../../../Utils/getFormat";
import {
  BLOODSUGAR,
  INSULIN,
  STEPS,
  WEIGHT,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES
} from "../../../dataTypes";
import CompareDataGraph from "./compareDataGraph";
import { getAggregatedDataForDataType } from "../../../Utils/aggregatedDataForDataType";

class MultipleGraphCard extends Component {
  makeGraph = dataType => {
    const aggregatedData = getAggregatedDataForDataType(
      this.props.baseInfo,
      this.props.patient.datasets,
      dataType,
      "compareData"
    );
    return (
      <CompareDataGraph aggregatedData={aggregatedData} dataType={dataType} />
    );
  };

  makePeriodStepper = data => {
    if (data) {
      return (
        <PeriodStepper
          start={this.props.baseInfo.start}
          end={this.props.baseInfo.end}
          periodName={this.props.baseInfo.view.periodName}
        />
      );
    }
  };

  makeContent = () => {
    let dataTypes = this.props.baseInfo;
    let bloodSugar = dataTypes.bloodSugarChecked;
    let insulin = dataTypes.insulinChecked;
    let steps = dataTypes.stepsChecked;
    let weight = dataTypes.weightChecked;
    let physicalActivity = dataTypes.physicalActivityChecked;
    let carbohydrates = dataTypes.carbohydratesChecked;

    let { periodName, periodNumber, intervalName } = periodFromView(
      this.props.baseInfo.view
    );
    let startEndTimes = getStartEndTimes(
      this.props.baseInfo.view,
      this.props.baseInfo.nrOfIntervalsBack
    );
    let start = startEndTimes.start;
    let end = startEndTimes.end;
    let xAxisTicks = aggregateData(
      [
        {
          value: 0,
          start: moment()
            .subtract(periodNumber, periodName)
            .format("YYYY-MM-DDTHH:mm:ss")
        }
      ],
      intervalName,
      start,
      end,
      getFormat(periodName, intervalName)
    );
    const noDataTypesChecked =
      (bloodSugar ||
        insulin ||
        steps ||
        weight ||
        physicalActivity ||
        carbohydrates) === false;

    if (noDataTypesChecked) {
      return (
        <span>
          Valg de datatyper som du vill se sammelign mellan i listan nedan.
        </span>
      );
    } else {
      return (
        <div>
          <div>
            {bloodSugar && this.makeGraph(BLOODSUGAR)}
            {insulin && this.makeGraph(INSULIN)}
            {steps && this.makeGraph(STEPS)}
            {weight && this.makeGraph(WEIGHT)}
            {physicalActivity && this.makeGraph(PHYSICAL_ACTIVITY)}
            {carbohydrates && this.makeGraph(CARBOHYDRATES)}
            <ResponsiveContainer width="100%" height={30}>
              <BarChart
                width={350}
                height={30}
                data={xAxisTicks}
                margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
              >
                <XAxis dataKey="x" tick={{ fontSize: "12px" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {this.makePeriodStepper(
            bloodSugar ||
              insulin ||
              steps ||
              weight ||
              physicalActivity ||
              carbohydrates
          )}
        </div>
      );
    }
  };

  render() {
    return <CardComponent title={"Over tid"} content={this.makeContent()} />;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(MultipleGraphCard);
