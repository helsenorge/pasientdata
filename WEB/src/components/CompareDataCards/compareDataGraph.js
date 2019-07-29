import React from "react";
import { YAxis, Bar, BarChart, LineChart, Line, ResponsiveContainer } from "recharts";
import {BLOODSUGAR, INSULIN, STEPS, WEIGHT, PHYSICAL_ACTIVITY, CARBOHYDRATES} from "../../dataTypes";

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
  
  if(chartData.chartType === 'bar') {
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
              <Bar dataKey='y' fill={chartData.color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
  } else if(chartData.chartType === 'line') {
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

const chartDataByDataType = {
    [BLOODSUGAR]: {
        chartType: 'line',
        unit: 'mmol/l',
        color: '#E71D37'
    },
    [INSULIN]: {
        chartType: 'bar',
        unit: 'U',
        color: '#85C99E'
    },
    [STEPS]: {
        chartType: 'bar',
        unit: 'steps',
        color: '#59C3FF'
    },
    [WEIGHT]: {
        chartType: 'line',
        unit: 'kg',
        color: '#E38B21'
    },
    [PHYSICAL_ACTIVITY]: {
        chartType: 'bar',
        unit: 'min',
        color: '#EF87CE'
    },
    [CARBOHYDRATES]: {
        chartType: 'bar',
        unit: 'g',
        color: '#EEE05D'
    },
}

const getDomain = (dataType, aggregatedData) => {
    if(dataType === WEIGHT) {
        const minWeight = aggregatedData
            .map(data => data.y)
            .reduce((a, b) => Math.min(a, b));
        const maxWeight = aggregatedData
            .map(data => data.y)
            .reduce((a, b) => Math.max(a, b));
        return [Math.floor(minWeight) - 5, Math.ceil(maxWeight) + 5];
    }
};
