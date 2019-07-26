export default function intervalToString(interval) {
  switch (interval) {
    case "year":
      return "år";
    case "month":
      return "måned:";
    case "week":
      return "uke:";
    case "day":
      return "dag:";
    case "hour":
      return "Kl:";
    default:
      return "Dato:";
  }
}
