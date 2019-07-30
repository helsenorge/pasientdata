import moment from "moment";

export default function fakeCarbData(startString, endString, mean, range) {
  let start;
  let end;
  let value;
  let data = [];
  let percentage = 0.15;
  let prefix = 0;
  let dataLength =
    moment(endString, "YYYY-MM-DDTHH:mm:ss").diff(
      moment(startString, "YYYY-MM-DDTHH:mm:ss"),
      "hours"
    ) + 1;

  for (let i = 0; i < dataLength; i++) {
    if (Math.random() < 0.3) {
      prefix = -1;
    } else {
      prefix = 1;
    }
    start = moment(startString, "YYYY-MM-DDTHH:mm:ss")
      .add(i, "hours")
      .format("YYYY-MM-DDTHH:mm:ss");
    end = moment(startString)
      .add(i + 1, "hours")
      .format("YYYY-MM-DDTHH:mm:ss");
    if (Math.random() < percentage) {
      value = Math.ceil(mean + prefix * Math.random() * range * 0.5);
    } else {
      value = 0;
    }

    data.push({ start: start, end: end, value: value });
  }
  return data;
}
