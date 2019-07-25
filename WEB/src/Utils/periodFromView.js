export default function(view) {
  switch (view) {
    case "day":
      return { periodName: "day", periodNumber: 1, intervalName: "hour" };
    case "week":
      return { periodName: "week", periodNumber: 1, intervalName: "day" };

    case "2weeks":
      return { periodName: "week", periodNumber: 2, intervalName: "day" };
    case "month":
      return { periodName: "month", periodNumber: 1, intervalName: "day" };

    case "3months":
      return { periodName: "month", periodNumber: 3, intervalName: "week" };
    case "year":
      return { periodName: "year", periodNumber: 1, intervalName: "month" };

    case "custom":
      // @todo Make this smarter.
      return { periodName: "week", periodNumber: 1, intervalName: "day" };
    default:
      return { periodName: "week", periodNumber: 1, intervalName: "day" };
  }
}
