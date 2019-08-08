import React from "react";
import {
  XAxis,
  YAxis,
  Bar,
  BarChart,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import { chartDataByDataType, getDomain } from "../../../dataTypes";

const InsightGraph = ({ aggregatedData, dataType }) => {
  const chartData = chartDataByDataType[dataType];
  const chartWidth = 400;
  const chartHeight = 180;
  const chartMargin = { top: 20, right: 5, bottom: 10, left: 0 };

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
            <XAxis dataKey="x" tick={{ fontSize: "12px" }} />
            <Bar dataKey="y" fill="#59C3FF" />
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
            <XAxis dataKey="x" tick={{ fontSize: "12px" }} />
            <Line
              type="linear"
              dataKey="y"
              stroke="#59C3FF"
              fill="#59C3FF"
              dot={{ strokeWidth: 2, r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default InsightGraph;
