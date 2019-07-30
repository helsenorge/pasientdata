import React from "react";
import moment from "moment";
import InsightButton from "../InsightButton/insightButton";
import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import averageData from "../../Utils/averageData";

const weightContent = (data, goal, interval, period) => {
  let aggregated = averageData(
    data,
    interval,
    moment()
      .subtract(1, period)
      .endOf(interval),
    moment(),
    "ddd"
  );
  const noRecentData = aggregated.filter(data => data.y > 0).length === 0;
  if (noRecentData && data.length > 0) {
    //Without fake data
    /*const lastDataPoint = data[data.length - 1].value;
    aggregated = aggregated.map(data => ({x: data.x, y: lastDataPoint}));*/

    aggregated = aggregated.map((data, index) => ({
      x: data.x[0],
      y: fakeWeightData[index % fakeWeightData.length]
    }));
  }
  const minWeight = aggregated
    .map(data => data.y)
    .reduce((a, b) => Math.min(a, b));
  const maxWeight = aggregated
    .map(data => data.y)
    .reduce((a, b) => Math.max(a, b));
  return (
    <div>
      <ResponsiveContainer width="100%" height={96}>
        <LineChart
          width={400}
          height={96}
          data={aggregated}
          margin={{ top: 0, right: 50, bottom: 0, left: 5 }}
        >
          <YAxis domain={[minWeight - 5, maxWeight + 5]} hide />
          <XAxis height={2} dataKey="x" tick={false} />
          <Line
            dataKey="y"
            type="linear"
            stroke="#EF87CE"
            strokeWidth={2}
            dot={false}
          />
          <ReferenceLine
            y={goal}
            stroke="grey"
            strokeDasharray="3 3"
            label={{
              value: goal,
              position: "right"
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <InsightButton linkTo={"/weight"} />
    </div>
  );
};

export default weightContent;

const fakeWeightData = [72, 72, 72, 69, 69, 68, 70, 72, 72, 72, 69, 69, 68, 70];
