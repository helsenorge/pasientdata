import moment from "moment";
import findStartAndEndIndex from "./findStartAndEndIndex";

export default function filterActivityByDate(
  inData,
  startString,
  endString,
  outputFormat,
  interval
) {

  const { startIndex, endIndex } = findStartAndEndIndex(
    inData,
    startString,
    endString
  );

  let slicedData = inData.slice(startIndex, endIndex);

  let data = slicedData.map(item => ({
    x: moment(item.start, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD"),
    y: item.value
  }));

  // fillters based on date which is the x value and increments for each instance which is the y value.
  let concatenatedData = Object.values(
    data.reduce((c, { x }) => {
      c[x] = c[x] || { x: x, y: 0 };
      c[x].y++;
      return c;
    }, {})
  );

  if (
    moment().isAfter(
      moment(concatenatedData[concatenatedData.length - 1].x),
      interval
    )
  ) {
    concatenatedData.push({ x: moment().format("YYYY-MM-DD"), y: 0 });
  }

  let filteredArray = concatenatedData.map(item => ({
    x: moment(item.x, "YYYY-MM-DD").format(outputFormat),
    y: item.y
  }));

  return filteredArray;
}
