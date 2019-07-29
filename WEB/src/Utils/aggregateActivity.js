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


}