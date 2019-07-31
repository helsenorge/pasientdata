export default function(view) {
  switch (view) {
    case "day":
      return {
        periodName: "day",
        periodNumber: 1,
        intervalName: "hour",
        intervalNumber: "24"
      };
    case "week":
      return {
        periodName: "week",
        periodNumber: 1,
        intervalName: "day",
        intervalNumber: "7"
      };

    case "2weeks":
      return {
        periodName: "week",
        periodNumber: 2,
        intervalName: "day",
        intervalNumber: "14"
      };
    case "month":
      return {
        periodName: "month",
        periodNumber: 1,
        intervalName: "day",
        intervalNumber: "30"
      };

    case "3months":
      return {
        periodName: "month",
        periodNumber: 3,
        intervalName: "week",
        intervalNumber: "12"
      };
    case "year":
      return {
        periodName: "year",
        periodNumber: 1,
        intervalName: "month",
        intervalNumber: "12"
      };

    case "custom":
      // @todo Make this smarter.
      return {
        periodName: "custom",
        periodNumber: 1,
        intervalName: "day",
        intervalNumber: "7"
      };
    default:
      return {
        periodName: "week",
        periodNumber: 1,
        intervalName: "day",
        intervalNumber: "7"
      };
  }
}
