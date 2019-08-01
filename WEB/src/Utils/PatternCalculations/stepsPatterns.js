import moment from "moment";
import periodFromView from "../periodFromView";

export function stepsGreatestPeriod(view, data, goals) {
  let { periodName, periodNumber, intervalName } = periodFromView(view);
  let greatestValueObject = data.reduce((prev, current) =>
    prev.y > current.y ? prev : current
  );
  let text = getPatternTextGreatestValue(
    periodName,
    intervalName,
    greatestValueObject,
    periodNumber
  );
  return [text, greatestValueObject];
}

const getPatternTextGreatestValue = (
  period,
  interval,
  valueObj,
  periodNumber
) => {
  let time = valueObj.x;
  let value = valueObj.y;
  let startTime;
  let endTime;
  let periodText;
  if (interval === "day") {
    startTime = moment(time).format("DD.MM");
    if (period === "week" && periodNumber === 1) {
      periodText = "I løpet av den siste uken gikk du flest skritt den ";
    } else if (period === "week" && periodNumber === 2) {
      periodText = "I løpet av de siste to ukene gikk du flest skritt den ";
    } else {
      periodText = "I løpet av den siste måneden gikk du flest skritt den ";
    }
    return periodText + startTime + " (" + value + ").";
  } else if (interval === "hour") {
    startTime = moment(time).format("HH:mm");
    endTime = moment(time)
      .add(1, "hours")
      .format("HH:mm");
    return (
      "I dag gikk du flest skritt mellom " +
      startTime +
      " og " +
      endTime +
      " (" +
      value +
      ")."
    );
  } else if (interval === "week") {
    startTime = moment(time).format("DD.MM");
    endTime = moment(time)
      .add(1, interval)
      .format("DD.MM");
    return (
      "I løpet av de siste tre månedene gikk du flest skritt mellom " +
      startTime +
      " og " +
      endTime +
      " (" +
      value +
      ")."
    );
  } else if (period === "year") {
    startTime = moment(time).format("MMMM");
    return (
      "I løpet av de siste tre månedene gikk du flest skritt i " +
      startTime +
      " (" +
      value +
      ")."
    );
  } else if (period === "custom") {
    startTime = moment(time).format("DD.MM");
    return (
      "Du gikk flest skritt den " +
      startTime +
      " (" +
      value +
      ") i den valgte perioden."
    );
  }
};
