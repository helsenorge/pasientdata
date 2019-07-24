import moment from "moment";

function FakeGlucoseData() {
  let start = [];
  let end = [];
  let value = [];
  let data = [];
  const period = 10;
  let currX;
  const interval = 8;
  const mean = 9;
  const sum = 15;
  const dataLength = 2000;
  for (let i = 0; i < dataLength; i++) {
    currX = i / period;
    start.push(
      moment()
        .subtract(i, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss")
    );
    end.push(
      moment()
        .subtract(i - 1, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss")
    );
    value.push(
      ((Math.sin(currX) +
        5 * Math.sin(2 * currX) +
        3 * Math.sin(8 * currX) +
        4 * Math.sin(10 * currX) +
        3 * Math.cos(0.05 * currX)) /
        sum) *
        interval +
        mean
    );

    data.push({ start: start[i], end: end[i], value: value[i] });
  }

  return data.reverse();
}

export default FakeGlucoseData;
