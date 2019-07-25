import periodFromView from "./periodFromView";
import moment from "moment";

export default function getStartEndTimes(view, nrOfIntervalsBack) {
  let { periodName, periodNumber } = periodFromView(view);
  return {
    start: moment()
      .startOf(periodName)
      .subtract(periodNumber - 1 + nrOfIntervalsBack, periodName)
      .format("YYYY-MM-DDTHH:mm:ss"),
    end: moment()
      .endOf(periodName)
      .subtract(nrOfIntervalsBack, periodName)
      .format("YYYY-MM-DDTHH:mm:ss")
  };
}
