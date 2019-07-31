import periodFromView from "./periodFromView";
import moment from "moment";

export default function getStartEndTimes(view, nrOfIntervalsBack) {
  let { periodName, periodNumber, intervalName } = periodFromView(view);
  let diff = parseInt(periodNumber) + parseInt(nrOfIntervalsBack);
  let startTime;
  let endTime;

  if (intervalName === "day") {
    startTime = moment()
      .subtract(diff, periodName)
      .add(1, intervalName)
      .format("YYYY-MM-DDTHH:mm:ss");
    endTime = moment()
      .subtract(nrOfIntervalsBack, periodName)
      .format("YYYY-MM-DDTHH:mm:ss");
  } else {
    startTime = moment()
      .subtract(diff, periodName)
      .format("YYYY-MM-DDTHH:mm:ss");
    endTime = moment()
      .subtract(nrOfIntervalsBack, periodName)
      .format("YYYY-MM-DDTHH:mm:ss");
  }
  return {
    start: startTime,
    end: endTime
  };
}
