import React from "react";
import {
  YAxis,
  Bar,
  BarChart,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import { WEIGHT, chartDataByDataType, getDomain } from "../../../dataTypes";

const CompareDataGraph = ({ aggregatedData, dataType }) => {
  const chartData = chartDataByDataType[dataType];
  const chartWidth = 350;
  const chartHeight = 150;
  const chartMargin = { top: 20, right: 30, left: 0, bottom: 0 };

  const yAxis = (
    <YAxis
      label={{
        value: chartData.unit,
        position: "top",
        offset: 10,
        fontSize: "12px"
      }}
      domain={getDomain(dataType, aggregatedData)}
      tick={{ fontSize: "12px" }}
      width={40}
    />
  );

  if (chartData.chartType === "bar") {
    return (
      <div>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={aggregatedData}
            margin={chartMargin}
          >
            {yAxis}
            <Bar dataKey="y" fill={chartData.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else if (chartData.chartType === "line") {
    return (
      <div>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart
            width={chartWidth}
            height={chartHeight}
            data={aggregatedData}
            margin={chartMargin}
          >
            {yAxis}
            <Line
              type="linear"
              dataKey="y"
              stroke={chartData.color}
              fill={chartData.color}
              dot={{ strokeWidth: 2, r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default CompareDataGraph;
