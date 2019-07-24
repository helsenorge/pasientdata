import React, { Component } from "react";
import findStartAndEndIndex from "../findStartAndEndIndex";
import moment from "moment";

export function bloodSugarFluctuations(period, data) {
  /*eksempel for ukesview: 
      slice data i dager
      summer alle abs(delta) per dag
      finn dagen med høyest sum*/

  //slice i ønskede intervaller
  let interval = "hour";
  let numIntervals = 24;
  let { startIndex, endIndex } = findStartAndEndIndex(
    data,
    data.length,
    moment()
      .subtract(1, "day")
      .format("YYYY-MM-DDTHH:mm:ss"),
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );
  let slicedData = data.slice(startIndex, endIndex);
  console.log(
    moment()
      .subtract(1, "day")
      .format("YYYY-MM-DDTHH:mm:ss")
  );
  console.log(moment().format("YYYY-MM-DDTHH:mm:ss"));
  console.log(startIndex);
  console.log(endIndex);
  console.log(slicedData);

  let periodData = {};

  for (let i = 0; i < numIntervals; i++) {}

  let day = "";

  return day;
}

export function bloodSugarGreatestChange(interval, data) {
  let startPeriod = "STARTPERIOD";
  let endPeriod = "ENDPERIOD";
  let amount = "AMOUNT";
  return [startPeriod, endPeriod, amount];
}
