function Trends(data, upperLimit, lowerLimit) {
  let sum = 0;
  let timeAbove = 0;
  let timeBelow = 0;
  let timeWithin = 0;
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
  const mean = sum / data.length;
  return { timeAbove, timeBelow, timeWithin, mean };
}

export default Trends;
