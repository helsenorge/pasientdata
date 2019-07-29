import React, { Component } from "react";
import moment from "moment";
import CardComponent from "../Card/cardComponent";
import { connect } from "react-redux";
import { XAxis, BarChart, ResponsiveContainer } from "recharts";
import PeriodStepper from "../PeriodStepper/periodStepper";
import periodFromView from "../../Utils/periodFromView";
import aggregateData from "../../Utils/aggregateData";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import getFormat from "../../Utils/getFormat";
import {BLOODSUGAR, INSULIN, STEPS, WEIGHT, PHYSICAL_ACTIVITY, CARBOHYDRATES} from "../../dataTypes";
import CompareDataGraph from "./compareDataGraph";
import averageData from "../../Utils/averageData";
import FakeGlucoseData from "../../Utils/fakeGlucose";

class MultipleGraphCard extends Component {
  makeGraph = dataType => {
    const aggregatedData = getAggregatedDataForDataType(this.props.baseInfo, this.props.patient.datasets, dataType);
    return (
      <CompareDataGraph
        aggregatedData={aggregatedData}
        dataType={dataType}
      />
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

const getAggregatedDataForDataType = (baseInfo, dataSets, dataType) => {
  let { periodName, periodNumber, intervalName } = periodFromView(baseInfo.view);
  let startEndTimes = getStartEndTimes(
    baseInfo.view,
    baseInfo.nrOfIntervalsBack
  );
  let start = startEndTimes.start;
  let end = startEndTimes.end;
  if (
    baseInfo.view === "custom" &&
    baseInfo.start !== "" &&
    baseInfo.end !== ""
  ) {
    start = baseInfo.start;
    end = baseInfo.end;
  }
  function getData() {
    switch(dataType) { 
      case STEPS:
          return dataSets[0].measurements;
      case WEIGHT: 
          return dataSets[1].measurements;
      case CARBOHYDRATES:
      case PHYSICAL_ACTIVITY:
      case BLOODSUGAR:
      case INSULIN:
          //if data is missing, generate empty datapoints to present in prototype
          return [{value: 0, start: moment().subtract(periodNumber, periodName).format('YYYY-MM-DDTHH:mm:ss')}]
    }
  }
  const data = getData();

  function getAggregatedData () {
    switch(dataType) {
      case BLOODSUGAR:
      case INSULIN:
      case STEPS:
      case CARBOHYDRATES:
      case PHYSICAL_ACTIVITY:
          return aggregateData(
            data,
            intervalName,
            start,
            end,
            getFormat(periodName, intervalName)
          );
      case WEIGHT:
          return averageData(
            data,
            intervalName,
            start,
            end,
            getFormat(periodName, intervalName)
          );
    }
  }
  const fakeDataForDataType = {
    [BLOODSUGAR]: FakeGlucoseData().map(data => data.value),
    [INSULIN]: [25, 22, 30, 32, 28, 25, 33, 35, 28],
    [WEIGHT]: [72, 72, 72, 69, 69, 68, 70, 72, 72, 72, 69, 69, 68, 70],
    [PHYSICAL_ACTIVITY]: [40, 28, 0, 45, 0, 0, 55, 65, 36],
    [CARBOHYDRATES]: [250, 260, 220, 270, 300, 230, 150, 180]
  };

  let aggregated = getAggregatedData();
  const noRecentData = aggregated.filter(data => data.y > 0).length === 0;
  //Fake data to present in prototype
  if(noRecentData) {
    const fakeData = fakeDataForDataType[dataType];
    aggregated = aggregated.map((data, index) => ({x: data.x[0], y: fakeData[index % fakeData.length]}));
  }
  return aggregated;
}

