import periodFromView from "./periodFromView";
import moment from "moment";

export default function getStartEndTimes(view, nrOfIntervalsBack) {
  let { periodName, periodNumber } = periodFromView(view);
  let diff = parseInt(periodNumber) - 1 + parseInt(nrOfIntervalsBack);
  let startTime = moment()
    .startOf(periodName)
    .subtract(diff, periodName)
    .format("YYYY-MM-DDTHH:mm:ss");
  let endTime = moment()
    .endOf(periodName)
    .subtract(nrOfIntervalsBack, periodName)
    .format("YYYY-MM-DDTHH:mm:ss");

  return {
    start: startTime,
    end: endTime
  };
}
