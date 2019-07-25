import findStartAndEndIndex from "../findStartAndEndIndex";
import Trends from "../trends";
import aggregateData from "../aggregateData";
import moment from "moment";

export function bloodSugarFluctuations(view, data, goals) {
  let interval = "hour";
  let numIntervals = 24;
  let { startIndex, endIndex } = findStartAndEndIndex(
    data,
    moment()
      .subtract(1, view)
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
  return (
    "Mest svingninger i blodsukkeret mellom " +
    start +
    " og " +
    end +
    " denne dagen."
  );
}

export function bloodSugarGreatestChange(view, data, goals) {
  let upperLimit = 12;
  let lowerLimit = 5;

  let numIntervals = 24;
  let { startIndex, endIndex } = findStartAndEndIndex(
    data,
    moment()
      .subtract(1, view)
      .format("YYYY-MM-DDTHH:mm:ss"),
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );

  let slicedData = data.slice(startIndex, endIndex);
  let dataArray;
  let sum = [];
  let lowerStart;
  let lowerEnd;
  let upperStart;
  let upperEnd;
  let withinLimits;
  let upperIndex;
  let lowerIndex;
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

  for (let i = 0; i < numIntervals * 60; i = i + 60) {
    dataArray = aggregated.slice(i, i + 60);
    trends = Trends(dataArray, upperLimit, lowerLimit);
    timeAbove = trends.timeAbove;
    timeWithin = trends.timeWithin;
    timeBelow = trends.timeBelow;
    withinLimits = (timeWithin * 100) / (timeWithin + timeAbove + timeBelow);
    sum.push(withinLimits);
  }
  let diff;
  for (let index = 1; index < sum.length; index++) {
    diff = sum[index] - sum[index - 1];
    if (diff > greatestChange) {
      greatestChange = Math.round(diff);
      upperIndex = index;
      lowerIndex = index - 1;
    }
  }

  lowerStart = moment(aggregated[lowerIndex * 60].x).format("HH:mm");
  upperStart = moment(aggregated[upperIndex * 60].x).format("HH:mm");
  lowerEnd = moment(aggregated[upperIndex * 60].x)
    .subtract(1, "minutes")
    .format("HH:mm");
  upperEnd = moment(aggregated[upperIndex * 60].x)
    .add(59, "minutes")
    .format("HH:mm");

  return (
    "Fra " +
    lowerStart +
    " to " +
    upperStart +
    " skjedde den største økningen i tid innom grenseverdiene, med en økning på " +
    greatestChange +
    "%"
  );
}
