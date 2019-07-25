import React, { Component } from "react";
import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import aggregateData from "../../Utils/aggregateData";

/*
 * The BarPlotter component.
 * Aggregates the data at the desired granularity in the desired period of time
 * and renders a barchart of the data.
 *
 * Props: dataset, start and end times and interval size (month, week, day, hour).
 * @prop dataset The dataset containing name and measurements.
 * @prop start The desired start time in "YYYY-MM-DDTHH:mm:ss".
 * @prop end The desired end time in "YYYY-MM-DDTHH:mm:ss".
 * @prop interval The size of each aggregate interval (i.e. the granularity).
 * @prop outputFormat The desired tick formatter for the bar plot in moment standard.
 */

class BarPlotter extends Component {
  render() {
    let aggregated = aggregateData(
      this.props.data,
      this.props.interval,
      this.props.start,
      this.props.end,
      this.props.outputFormat
    );

    if (this.props.page === "Dashboard") {
      return (
        <ResponsiveContainer width="100%" height={120}>
          <BarChart
            width={400}
            height={150}
            data={aggregated}
            margin={{ top: 10, right: 5, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="x" domain={["auto", "auto"]} name="Time" unit="" />
            <Bar dataKey="y" name="Steps/hour" fill="#EF87CE" />
            <Tooltip cursor={false} />
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
            <Bar dataKey="y" name="Steps/hour" fill="#EF87CE" />

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
            margin={{ top: 10, right: 5, bottom: 0, left: -40 }}
          >
            <XAxis dataKey="x" domain={["auto", "auto"]} name="Time" unit="" />
            <YAxis dataKey="y" name="Steps" unit="" type="number" />
            <Bar dataKey="y" name="Steps/hour" fill="#EF87CE" />

            <Legend />
            <Tooltip cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }
}

export default BarPlotter;
