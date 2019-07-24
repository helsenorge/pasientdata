import findStartAndEndIndex from "../findStartAndEndIndex";
import Trends from "../trends";
import aggregateData from "../aggregateData";
import moment from "moment";

export function bloodSugarFluctuations(period, data) {
  let interval = "hour";
  let numIntervals = 24;
  let { startIndex, endIndex } = findStartAndEndIndex(
    data,
    data.length,
    moment()
      .subtract(1, period)
      .format("YYYY-MM-DDTHH:mm:ss"),
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );

  let slicedData = data.slice(startIndex, endIndex);
  let dataArray;
  let sum = [];
  let start;
  let end;
  let greatestChange = 0;

  for (let i = 0; i < numIntervals * 60; i = i + 60) {
    dataArray = slicedData.slice(i, i + 60);
    let delta = 0;
    for (let j = 1; j < dataArray.length; j++) {
      delta = delta + Math.abs(dataArray[j - 1].value - dataArray[j].value);
    }
    sum.push(delta);
    if (delta >= greatestChange) {
      start = moment(dataArray[0].start).format("HH:mm");
      end = moment(dataArray[0].start)
        .add(1, interval + "s")
        .format("HH:mm");
      greatestChange = delta;
    }
  }

  return [start, end];
}

export function bloodSugarGreatestChange(period, data) {
  let startPeriod = "STARTPERIOD";
  let endPeriod = "ENDPERIOD";
  let amount = "AMOUNT";

  let upperLimit = 12;
  let lowerLimit = 5;

  let numIntervals = 24;
  let { startIndex, endIndex } = findStartAndEndIndex(
    data,
    data.length,
    moment()
      .subtract(1, period)
      .format("YYYY-MM-DDTHH:mm:ss"),
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );

  let slicedData = data.slice(startIndex, endIndex);
  let dataArray;
  let sum = [];
  let start;
  let end;
  let withinLimits;
  let sumIndex;
  let greatestChange = 0;

  let trends;
  let timeAbove;
  let timeWithin;
  let timeBelow;

  let aggregated = aggregateData(
    slicedData,
    "minute",
    moment()
      .subtract(1, "day")
      .format("YYYY-MM-DDTHH:mm:ss"),
    moment().format("YYYY-MM-DDTHH:mm:ss", "ddd")
  );
  console.log(aggregated);

  for (let i = 0; i < numIntervals * 60; i = i + 60) {
    dataArray = aggregated.slice(i, i + 60);

    // console.log(dataArray);

    trends = Trends(dataArray, upperLimit, lowerLimit);
    timeAbove = trends.timeAbove;
    timeWithin = trends.timeWithin;
    timeBelow = trends.timeBelow;
    withinLimits = (timeWithin * 100) / (timeWithin + timeAbove + timeBelow);
    sum.push(withinLimits);

    if (sum[sumIndex] - sum[sumIndex - 1] > greatestChange && sumIndex > 0) {
      greatestChange = sum[sumIndex] - sum[sumIndex - 1];
    }

    // if (delta >= greatestChange) {
    //   start = moment(dataArray[0].start).format("HH:mm");
    //   end = moment(dataArray[0].start)
    //     .add(1, interval + "s")
    //     .format("HH:mm");
    //   greatestChange = delta;
    // }
    sumIndex += 1;
  }

  console.log(sum);
  console.log(greatestChange);

  return [startPeriod, endPeriod, amount];
}
