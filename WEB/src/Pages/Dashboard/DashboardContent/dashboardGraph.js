import {
  WEIGHT,
  BLOODSUGAR,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES,
  chartDataByDataType,
  getDomain,
  getGoal,
  INSULIN,
  STEPS
} from "../../../dataTypes";
import React from "react";
import {
  YAxis,
  XAxis,
  Bar,
  BarChart,
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const DashboardGraph = ({ aggregatedData, dataType, patient }) => {
  const chartData = chartDataByDataType[dataType];
  const chartWidth = 400;
  const chartHeight = 96;
  const chartMargin = { top: 10, right: 50, bottom: 0, left: 0 };
  const barColor = "rgba(89, 195, 255, 0.8)";
  const yAxis = <YAxis domain={getDomain(dataType, aggregatedData)} hide />;
  const xAxis = <XAxis height={2} dataKey="x" tick={false} />;
  const goal = getGoal(patient, dataType);
  const goalLabel =
    dataType !== STEPS ? goal.value + " " + goal.unit : goal.value;
  const refValue = helpLines[dataType];
  const refLabel = dataType !== STEPS ? refValue + " " + goal.unit : refValue;
  const goalLine = (
    <ReferenceLine
      y={goal.value}
      stroke="#007544"
      strokeDasharray="3 3"
      label={{
        value: goalLabel,
        position: "right",
        fill: "#007544"
      }}
    />
  );
  const refLine = (
    <ReferenceLine
      y={refValue}
      stroke="#999999"
      label={{
        value: refLabel,
        position: "right",
        fill: "#999999"
      }}
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
            {xAxis}
            {refLine}
            <Bar dataKey="y" fill={barColor} />
            {goalLine}
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
            {xAxis}
            {goalLine}
            {refLine}
            <Line
              type="linear"
              dataKey="y"
              stroke={barColor}
              fill={barColor}
              dot={{ strokeWidth: 2, r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default DashboardGraph;

const helpLines = {
  [BLOODSUGAR]: 9,
  [INSULIN]: 20,
  [STEPS]: 5000,
  [WEIGHT]: 63,
  [PHYSICAL_ACTIVITY]: 60,
  [CARBOHYDRATES]: 200
};
