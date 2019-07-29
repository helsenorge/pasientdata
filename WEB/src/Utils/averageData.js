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
  //   console.log("input data: ", inData);
  let slicedData = inData.slice(startIndex, endIndex + 1);
  //   console.log(startIndex, endIndex);
  //   console.log("sliced data: ", slicedData);
  const inputFormat = "YYYY-MM-DDTHH:mm:ss";
  const startTime = moment(startString, inputFormat);
  const endTime = moment(endString, inputFormat);
  const slicedLength = slicedData.length;

  /*
   * Loop through the desired dataset and aggregate
   */

  let aggregated = [];

  // no data points in the chosen time period
  let data = slicedData.map(item => ({ x: item.start, y: item.value }));
  //   console.log("data from sliced data: ", data);
  if (data === undefined || data.length === 0) {
    data.push({ y: 0, x: startTime.format(inputFormat) });
  }

  let sum = data[0].y;
  let start = moment(data[0].x, inputFormat).startOf(interval);
  //console.log(start);
  // Add empty bars at start if needed
  //   let added = 1;
  //   while (moment(start).diff(startTime, interval + "s") - added > -1) {
  //     aggregated.push({
  //       y: 0,
  //       x: moment(startTime)
  //         .add(added, interval + "s")
  //         .format(outputFormat)
  //     });
  //     added++;
  //   }

  let currentDataTime;
  //console.log(inData);
  //   console.log(slicedData);
  let counter = 1;
  for (let i = 1; i < slicedLength; i++) {
    currentDataTime = moment(data[i].x, inputFormat);
    //console.log("i: ", i);
    //console.log("current time: ", currentDataTime);
    console.log(
      "diff fra start av interval: ",
      moment(start).diff(currentDataTime.startOf(interval), interval + "s")
    );
    if (
      moment(start).diff(currentDataTime.startOf(interval), interval + "s") ===
      0
    ) {
      counter += 1;
      sum = sum * ((counter - 1) / counter) + data[i].y / counter;
      //sum += data[i].y;
      //   console.log("counter: ", counter);
      //   console.log("sum: ", sum);
    } else {
      //Add same value inbetween if needed
      let skipped = 0;
      aggregated.push({
        y: sum,
        x: start.format(outputFormat)
      });
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
      //console.log("sum etter else: ", sum);
      sum = data[i].y;
      start = currentDataTime.startOf(interval);
      //console.log(start);
    }
  } // for sentence

  //console.log("verdien som pushes til aggregated: ", sum);
  //console.log()
  aggregated.push({ y: sum, x: start.format(outputFormat) });

  // Add values at end if needed
  while (
    moment(endTime).diff(start.add(1, interval + "s"), interval + "s") > 0
  ) {
    aggregated.push({ y: sum, x: start.format(outputFormat) });
  }
  if (moment(endTime).diff(start.add(1, interval + "s"), interval + "s") > -1) {
    aggregated.push({
      y: sum,
      x: start.subtract(1, interval + "s").format(outputFormat)
    });
  }
  //   console.log(aggregated);
  return aggregated;
}
