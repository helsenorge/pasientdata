export default function getFormat(view, interval) {
  switch (view) {
    case "minute":
      switch (interval) {
        case "minute":
          return "HH:mm:ss";
        default:
          return;
      }
    case "hour":
      switch (interval) {
        case "minute":
          return "HH:mm";
        case "hour":
          return "HH:mm";
        default:
          return;
      }
    case "day":
      switch (interval) {
        case "minute":
          return "HH:mm";
        case "hour":
          return "HH:mm";
        case "day":
          return "ddd";
        default:
          return;
      }
    case "week":
      switch (interval) {
        case "minute":
          return "HH:mm:ss";
        case "hour":
          return "ddd HH:mm";
        case "day":
          return "ddd";
        case "week":
          return "ww";
        default:
          return;
      }
    case "month":
      switch (interval) {
        case "minute":
          return "HH:mm:ss";
        case "hour":
          return "DD.MM HH:mm";
        case "day":
          return "DD.MM";
        case "week":
          return "ww";
        case "month":
          return "MM";
        default:
          return;
      }
    case "year":
      switch (interval) {
        case "minute":
          return "MM.DD HH:mm";
        case "hour":
          return "MM.DD HH:mm";
        case "day":
          return "DD.MM";
        case "week":
          return "ww";
        case "month":
          return "MM.YYYY";
        case "year":
          return "YYYY";
        default:
          return;
      }
    default:
      return "DD.MM.YY";
  }
}
