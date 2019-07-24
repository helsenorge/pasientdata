function Trends(data, upperLimit, lowerLimit) {
  let sum = 0;
  let timeAbove = 0;
  let timeBelow = 0;
  let timeWithin = 0;
  if (data[0].value) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value > upperLimit) {
        timeAbove++;
      } else if (data[i].value < lowerLimit) {
        timeBelow++;
      } else {
        timeWithin++;
      }
      sum += data[i].value;
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].y > upperLimit) {
        timeAbove++;
      } else if (data[i].y < lowerLimit) {
        timeBelow++;
      } else {
        timeWithin++;
      }
      sum += data[i].y;
    }
  }
  const mean = sum / data.length;
  return { timeAbove, timeBelow, timeWithin, mean, sum };
}

export default Trends;
