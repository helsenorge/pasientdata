import moment from "moment";
import periodFromView from "./periodFromView";
import getStartEndTimes from "./getStartEndTimes";
import aggregateData from "./aggregateData";
import averageData from "./averageData";
import FakeGlucoseData from "./fakeGlucose";
import getFormat from "./getFormat";
import {
  BLOODSUGAR,
  INSULIN,
  STEPS,
  WEIGHT,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES
} from "../dataTypes";
import fakeCarbData from "./fakeCarbData";
import fakeInsulinData from "./fakeInsulinData";
import sortActivity from './sortActivity';

export const getAggregatedDataForDataType = (baseInfo, dataSets, dataType) => {
  let { periodName, periodNumber, intervalName } = periodFromView(
    baseInfo.view
  );
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
    switch (dataType) {
      case STEPS:
        return dataSets[0].measurements;
      case WEIGHT:
        return dataSets[1].measurements;
      case PHYSICAL_ACTIVITY:
        let sortedActivity = sortActivity(
          dataSets[2].measurements,
          moment()
            .subtract(periodNumber, periodName)
            .format("YYYY-MM-DDTHH:mm:ss"),
          moment().format("YYYY-MM-DDTHH:mm:ss")
        );
        return sortedActivity;
      case CARBOHYDRATES:
        return fakeCarbData(start, end);
      case INSULIN:
        return fakeInsulinData(start, end);
      case BLOODSUGAR:
        //if data is missing, generate empty datapoints to present in prototype
        return [
          {
            value: 0,
            start: moment()
              .subtract(periodNumber, periodName)
              .format("YYYY-MM-DDTHH:mm:ss")
          }
        ];
    }
  }
  const data = getData();

  function getAggregatedData() {
    switch (dataType) {
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

  // console.log(aggregated)
  const noRecentData = aggregated.filter(data => data.y > 0).length === 0;
  //Fake data to present in prototype
  if (noRecentData) {
    const fakeData = fakeDataForDataType[dataType];
    aggregated = aggregated.map((data, index) => ({
      x: data.x,
      y: fakeData[index % fakeData.length]
    }));
  }
  return aggregated;
};
