import React, { Component } from "react";
//import { VictoryChart, VictoryGroup, VictoryArea } from "victory";
import numeral from "numeral";
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

class Chart extends Component {
  state = { colors: ["#7DB3FF", "#49457B", "#FF7C78"] };
  numberFormatter = item => numeral(item).format("O");
  dateFormatter = item => moment(item, "YYYY-MM-DDTHH:mm:ss").format("MMM YY");
  render() {
    console.log(this.props.datasets);
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={this.props.datasets[0].measurements}>
          <XAxis tickFormatter={this.dateFormatter} dataKey="start" />
          <YAxis tickFormatter={this.numberFormatter} />
          <Bar
            stackId="a"
            dataKey="value"
            name="Steps"
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
