import moment from "moment";

export default function filterActivityByDate(inData) {
  let data = inData.map(item => ({
    x: moment(item.start, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD"),
    y: item.value
  }));

  let filteredArray = [];
  let prev;
  data.sort();
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    // if (data[i] === 0) {
    //   prev;
    // }
    if (data[i].x !== prev) {
      filteredArray.push({ y: count, x: data[i].x });
      count = 0;
    } else {
      count++;
    }
    prev = data[i].x;
  }

  return filteredArray;
}
