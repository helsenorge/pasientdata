import React, { Component } from "react";
//import { VictoryChart, VictoryGroup, VictoryArea } from "victory";
import moment from "moment";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar
} from "recharts";

const chart = ({ resultSet, colors, dateFormatter, numberFormatter }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={resultSet.chartPivot()}>
      <XAxis tickFormatter={dateFormatter} dataKey="x" />
      <YAxis tickFormatter={numberFormatter} />
      {resultSet.seriesNames().map((series, i) => (
        <Bar
          stackId="a"
          dataKey={series}
          name={series.split(",")[0]}
          fill={colors[i]}
        />
      ))}
      <Legend />
      <Tooltip labelFormatter={dateFormatter} formatter={numberFormatter} />
    </BarChart>
  </ResponsiveContainer>
);

class Chart extends Component {
  state = { colors: ["#7DB3FF", "#49457B", "#FF7C78"] };
  numberFormatter = item => item.value;
  dateFormatter = item => moment(item, "YYYY-MM-DDTHH:mm:ss").format("MMM YY");
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={this.props.datasets[0]}>
          <XAxis tickFormatter={this.dateFormatter} dataKey="start" />
          <YAxis tickFormatter={this.numberFormatter} />
          <Bar
            stackId="a"
            dataKey="value"
            name="a"
            fill={this.state.colors[0]}
          />
          <Legend />
          <Tooltip
            labelFormatter={this.dateFormatter}
            formatter={this.numberFormatter}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;
