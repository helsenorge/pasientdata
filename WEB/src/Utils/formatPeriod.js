import moment from "moment";

export default function formatPeriod(period) {
  switch (period) {
    case "year":
      return "YYYY";
    case "month":
      return "MM";
    case "week":
      return "ww";
    case "day":
      return "DD/MM";
    case "hour":
      return "DD.MM h:00";
    default:
      return "DD.MM.YYYY hh:00";
  }
}
