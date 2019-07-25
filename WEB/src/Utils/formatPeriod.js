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
      return "dd/MM";
    case "hour":
      return "dd.MM h:00";
    default:
      return "dd.MM.YYYY hh:00";
  }
}
