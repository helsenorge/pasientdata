import moment from "moment";
import findStartAndEndIndex from "./findStartAndEndIndex";

export default function averageDataFunctions(
  inData,
  interval,
  startString,
  endString,
  outputFormat
) {
  const { startIndex, endIndex } = findStartAndEndIndex(
    inData,
    startString,
    endString
  );
  let slicedData;
  let added = 0;
  let start;
  let sum;
  let currentDataTime;
  let time;
  const inputFormat = "YYYY-MM-DDTHH:mm:ss";
  const startTime = moment(startString, inputFormat);
  const endTime = moment(endString, inputFormat);
  let aggregated = [];

  if (endIndex > 0) {
    slicedData = inData.slice(startIndex, endIndex + 1);
  } else {
    slicedData = [];
  }

  let data = slicedData.map(item => ({ x: item.start, y: item.value }));
  const slicedLength = slicedData.length;

  if (data === undefined || data.length === 0) {
    data.push({ y: null, x: startTime.format(inputFormat) });
  }
  start = moment(data[0].x, inputFormat).startOf(interval);
  sum = data[0].y;

  if (moment(endTime).isBefore(inData[0].start)) {
    while (moment(start).diff(startTime, interval + "s") - added > 0) {
      time = moment(startTime)
        .add(added, interval + "s")
        .format(outputFormat);
      aggregated.push({
        y: null,
        x: time
      });
      added++;
    }
  } else if (moment(startTime).isBefore(moment(inData[0].start), "day")) {
    while (moment(start).diff(startTime, interval + "s") - added > -1) {
      time = moment(startTime)
        .add(added, interval + "s")
        .format(outputFormat);
      aggregated.push({
        y: null,
        x: time
      });
      added++;
    }
  } else if (slicedData.length === 0) {
    while (moment(start).diff(endTime, interval + "s") + added < 1) {
      time = moment(startTime)
        .add(added, interval + "s")
        .format(outputFormat);
      aggregated.push({
        y: inData[startIndex - 1].value,
        x: time
      });
      added++;
    }
  }

  let counter = 1;
  for (let i = 1; i < slicedLength; i++) {
    console.log("sliced length: ", slicedLength);
    currentDataTime = moment(data[i].x, inputFormat);
    if (
      moment(start).diff(currentDataTime.startOf(interval), interval + "s") ===
      0
    ) {
      counter += 1;
      sum = sum * ((counter - 1) / counter) + data[i].y / counter;
    } else {
      //Add same value inbetween if needed
      let skipped = 0;
      aggregated.push({
        y: sum,
        x: start.format(outputFormat)
      });
      //console.log(start.format(outputFormat));
      counter = 1;
      while (
        moment(start).diff(currentDataTime, interval + "s") + skipped <
        -1
      ) {
        aggregated.push({
          y: sum,
          x: moment(start)
            .add(1 + skipped, interval + "s")
            .startOf(interval)
            .format(outputFormat)
        });
        skipped++;
      }
      //   console.log(
      //     "for løkke: ",
      //     moment(start)
      //       .add(skipped, interval + "s")
      //       .startOf(interval)
      //       .format(outputFormat)
      //   );
      //console.log("sum etter else: ", sum);
      sum = data[i].y;
      start = currentDataTime.startOf(interval);
      //console.log(start);
    }
  }
  if (sum !== null) {
    aggregated.push({ y: sum, x: start.format(outputFormat) });
  }
  if (moment(endTime).diff(startTime, interval) > aggregated.length - 1) {
    while (
      moment(endTime).diff(start.add(1, interval + "s"), interval + "s") > 0
    ) {
      aggregated.push({ y: sum, x: start.format(outputFormat) });
    }
    if (
      moment(endTime).diff(start.add(1, interval + "s"), interval + "s") > -1
    ) {
      aggregated.push({
        y: sum,
        x: start.subtract(1, interval + "s").format(outputFormat)
      });
    }
  }

  return aggregated;
}
