import React, { Component } from "react";
import findStartAndEndIndex from "../findStartAndEndIndex";
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

export function bloodSugarGreatestChange(interval, data) {
  let startPeriod = "STARTPERIOD";
  let endPeriod = "ENDPERIOD";
  let amount = "AMOUNT";

  return [startPeriod, endPeriod, amount];
}
