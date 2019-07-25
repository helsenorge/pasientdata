export default function intervalToString(interval) {
  switch (interval) {
    case "year":
      return "År";
    case "month":
      return "Måned:";
    case "week":
      return "Uke:";
    case "day":
      return "Dag:";
    case "hour":
      return "Kl:";
    default:
      return "Dato:";
  }
}
