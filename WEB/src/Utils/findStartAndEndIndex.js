import moment from "moment";

export default function findStartAndEndIndex(data, start, end) {
  let startIndex = 0;
  let endIndex = data.length - 1;
  let endIndexFound = false;

  if (moment(data[0].start).isBefore(end)) {
    if (
      moment(end, "YYYY-MM-DDTHH:mm:ss").isAfter(
        moment(data[data.length - 1].start, "YYYY-MM-DDTHH:mm:ss")
      )
    ) {
      endIndexFound = true;
    }

    for (let i = 0; i < data.length; i++) {
      if (
        moment(start, "YYYY-MM-DDTHH:mm:ss").isAfter(
          moment(data[i].start, "YYYY-MM-DDTHH:mm:ss")
        )
      ) {
        startIndex = i; // Index right before the first data point we want to include.
      }
      if (
        !endIndexFound &&
        moment(end, "YYYY-MM-DDTHH:mm:ss").isBefore(
          moment(data[i].start, "YYYY-MM-DDTHH:mm:ss")
        )
      ) {
        endIndex = i; // Index right after the first data point we want to include.
        break;
      }
    }
    if (!endIndexFound) {
      endIndex--;
    }
    if (startIndex !== data.length - 1) {
      startIndex++;
    }
  } else {
    return { startIndex: 0, endIndex: 0 };
  }

  return { startIndex: startIndex, endIndex: endIndex };
}
