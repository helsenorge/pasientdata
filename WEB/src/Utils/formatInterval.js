export default function formatInterval(interval) {
  switch (interval) {
    case "year":
      return "YYYY";
    case "month":
      return "MM";
    case "week":
      return "w";
    case "day":
      return "DD/MM";
    case "hour":
      return "HH:mm";
    default:
      return "YYYY-MM-DDTHH:mm:ss";
  }
}
