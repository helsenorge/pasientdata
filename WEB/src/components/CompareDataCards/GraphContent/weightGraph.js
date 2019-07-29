import React from "react";
import moment from "moment";
import { YAxis, LineChart, Line, ResponsiveContainer } from "recharts";
//import aggregateData from "../../../Utils/aggregateData";
import averageData from "../../../Utils/averageData";
import periodFromView from "../../../Utils/periodFromView";
import formatInterval from "../../../Utils/formatInterval";
import getStartEndTimes from "../../../Utils/getStartEndTimes";

const WeightGraph = ({ data, baseInfo }) => {
  let { intervalName } = periodFromView(baseInfo.view);
  let startEndTimes = getStartEndTimes(
    baseInfo.view,
    baseInfo.nrOfIntervalsBack
  );
  let start = startEndTimes.start;
  let end = startEndTimes.end;

  let aggregated = averageData(
    data,
    intervalName,
    start,
    end,
    formatInterval(intervalName)
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
  console.log(Math.ceil(maxWeight));

  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart
          width={350}
          height={150}
          data={aggregated}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <YAxis
            label={{
              value: "kg",
              position: "top",
              offset: 10,
              fontSize: "12px"
            }}
            domain={[Math.floor(minWeight) - 5, Math.ceil(maxWeight) + 5]}
            tick={{ fontSize: "12px" }}
            width={40}
          />
          <Line
            type="linear"
            dataKey="y"
            stroke="#E38B21"
            fill="#E38B21"
            dot={{ strokeWidth: 2, r: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightGraph;

const fakeWeightData = [72, 72, 72, 69, 69, 68, 70, 72, 72, 72, 69, 69, 68, 70];
