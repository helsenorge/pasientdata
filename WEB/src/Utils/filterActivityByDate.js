import moment from "moment";

export default function filterActivityByDate(inData) {
  let data = inData.map(item => ({
    x: moment(item.start, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD"),
    y: item.value
  }));

  // fillters based on date which is the x value and increments for each instance which is the y value.
  let filteredArray = Object.values(
    data.reduce((c, { x }) => {
      c[x] = c[x] || { x: x, y: 0 };
      c[x].y++;
      return c;
    }, {})
  );

  return filteredArray;
}
