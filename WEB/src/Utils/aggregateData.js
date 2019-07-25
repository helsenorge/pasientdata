import moment from "moment";
import findStartAndEndIndex from "./findStartAndEndIndex";

export default function aggregateData(
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
  let slicedData = inData.slice(startIndex, endIndex);

  const inputFormat = "YYYY-MM-DDTHH:mm:ss";
  const startTime = moment(startString, inputFormat);
  const endTime = moment(endString, inputFormat);
  const slicedLength = slicedData.length;

  /*
   * Loop through the desired dataset and aggregate
   */

  let aggregated = [];
  let data = slicedData.map(item => ({ x: item.start, y: item.value }));
  if (data === undefined || data.length === 0) {
    data.push({ y: 0, x: startTime.format(inputFormat) });
  }
  let sum = data[0].y;
  let start = moment(data[0].x, inputFormat).startOf(interval);

  // Add empty bars at start if needed
  let added = 1;
  while (moment(start).diff(startTime, interval + "s") - added > -1) {
    aggregated.push({
      y: 0,
      x: moment(startTime)
        .add(added, interval + "s")
        .format(outputFormat)
    });
    added++;
  }

  let currentDataTime;
  for (let i = 1; i < slicedLength; i++) {
    currentDataTime = moment(data[i].x, inputFormat);
    if (
      moment(start).diff(currentDataTime.startOf(interval), interval + "s") ===
      0
    ) {
      sum += data[i].y;
    } else {
      // Add empty bars inbetween if needed
      let skipped = 0;
      aggregated.push({
        y: sum,
        x: start.format(outputFormat)
      });
      while (
        moment(start).diff(currentDataTime, interval + "s") + skipped <
        -1
      ) {
        aggregated.push({
          y: 0,
          x: moment(start)
            .add(1 + skipped, interval + "s")
            .startOf(interval)
            .format(outputFormat)
        });
        skipped++;
      }

      sum = data[i].y;
      start = currentDataTime.startOf(interval);
    }
  }
  aggregated.push({ y: sum, x: start.format(outputFormat) });

  // Add empty bars at end if needed
  while (
    moment(endTime).diff(start.add(1, interval + "s"), interval + "s") > 0
  ) {
    aggregated.push({ y: 0, x: start.format(outputFormat) });
  }
  if (moment(endTime).diff(start.add(1, interval + "s"), interval + "s") > -1) {
    aggregated.push({
      y: 0,
      x: start.subtract(1, interval + "s").format(outputFormat)
    });
  }
  return aggregated;
}
