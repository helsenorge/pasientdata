import moment from "moment";
import findStartAndEndIndex from "./findStartAndEndIndex";

export default function filterActivityByDate(
  inData,
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

  console.log(slicedData);


  let data = slicedData.map(item => ({
    x: moment(item.start, "YYYY-MM-DDTHH:mm:ss").format(outputFormat),
    y: item.value
  }));
  console.log(data);

  // fillters based on date which is the x value and increments for each instance which is the y value.
  let filteredArray = Object.values(
    data.reduce((c, { x }) => {
      c[x] = c[x] || { x: x, y: 0 };
      c[x].y++;
      return c;
    }, {})
  );

  console.log(filteredArray);
  return filteredArray;
}
