import React, { Component } from "react";
import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import fakeInsulinData from "../../../Utils/fakeInsulinData";

import aggregateData from "../../../Utils/aggregateData";
import { connect } from "react-redux";
import moment from "moment";

class InsulinGraph extends Component {
  render() {
    let data = fakeInsulinData(this.props.start, this.props.end);
    let aggregated = aggregateData(
      data,
      this.props.interval,
      this.props.start,
      moment(),
      "ddd"
    );
    if (this.props.page === "Dashboard") {
      return (
        <ResponsiveContainer width="100%" height={96}>
          <BarChart
            width={400}
            height={96}
            data={aggregated}
            margin={{ top: 10, right: 50, bottom: 0, left: 0 }}
          >
            <YAxis domain={[0, 50]} hide />
            <XAxis height={2} dataKey="x" tick={false} />
            <Bar dataKey="y" name="Steps/hour" fill={this.props.color} />

            <ReferenceLine
              y={35}
              stroke="grey"
              strokeDasharray="3 3"
              label={{
                value: 35,
                position: "right"
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (this.props.page === "Sammenlign") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={400}
            height={250}
            data={aggregated}
            margin={{ top: 10, right: 5, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="x" domain={["auto", "auto"]} name="Time" unit="" />
            <YAxis dataKey="y" name="Steps" unit="" type="number" />
            <Bar dataKey="y" name="Steps/hour" fill={this.props.color} />

            <Legend />
            <Tooltip cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width={400}
            height={250}
            data={aggregated}
            margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
          >
            <XAxis dataKey="x" domain={["auto", "auto"]} name="Time" unit="" />
            <YAxis dataKey="y" name="Steps" unit="" type="number" />
            <Bar dataKey="y" name="Steps/hour" fill={this.props.color} />

            {/* <Legend /> */}
            <Tooltip cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(InsulinGraph);
