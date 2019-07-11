import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

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

class BarPlotterV2 extends Component {
  findStartAndEndIndex = () => {
    const length = this.props.data.length;
    let startIndex = 0;
    let endIndex = length - 1;
    let endIndexFound = false;

    if (
      moment(this.props.end, "YYYY-MM-DDTHH:mm:ss").isAfter(
        moment(this.props.data[length - 1].start, "YYYY-MM-DDTHH:mm:ss"),
        this.props.interval
      )
    ) {
      endIndexFound = true;
    }

    for (let i = 0; i < this.props.data.length; i++) {
      if (
        moment(this.props.data[i].start, "YYYY-MM-DDTHH:mm:ss").isBefore(
          moment(this.props.start, "YYYY-MM-DDTHH:mm:ss"),
          this.props.interval
        )
      ) {
        startIndex = i; // Index right before the first data point we want to include.
      }
      if (
        !endIndexFound &&
        moment(this.props.end, "YYYY-MM-DDTHH:mm:ss").isAfter(
          moment(this.props.data[i].start, "YYYY-MM-DDTHH:mm:ss"),
          this.props.interval
        )
      ) {
        endIndex = i; // Index right after the first data point we want to include.
        break;
      }
    }
    if (!endIndexFound) {
      endIndex--;
    }
    if (startIndex !== length - 1) {
      startIndex++;
    }
    console.log("startIndex: ", startIndex);
    console.log("endIndex: ", endIndex);

    return { startIndex: startIndex, endIndex: endIndex };
  };

  aggregateData = () => {
    const { startIndex, endIndex } = this.findStartAndEndIndex();
    let slicedData = this.props.data.slice(startIndex, endIndex);

    const inputFormat = "YYYY-MM-DDTHH:mm:ss";
    const interval = this.props.interval;
    const startTime = moment(this.props.start, inputFormat);
    const endTime = moment(this.props.end, inputFormat);
    const numberOfIntervalsInPeriod = moment(startTime).diff(endTime, interval);
    const slicedLength = slicedData.length;
    const outputFormat = this.props.outputFormat;

    let data = slicedData.map(item => ({ x: item.start, y: item.value }));

    /*
     * Loop through the desired dataset and aggregate
     */

    let aggregated = [];
    let sum = data[0].y;
    let start = moment(data[0].x, inputFormat).startOf(interval);

    // Add empty bars at start if needed
    let added = 0;
    while (
      moment().diff(startTime, interval) + added <
      numberOfIntervalsInPeriod
    ) {
      aggregated.push({
        y: 0,
        x: moment()
          .subtract(numberOfIntervalsInPeriod - added, interval)
          .format(outputFormat)
      });
      added++;
    }

    for (let i = 1; i < slicedLength; i++) {
      if (
        start.diff(
          moment(data[i].x, inputFormat).startOf(interval),
          interval + "s"
        ) > -1
      ) {
        sum += data[i].y;
      } else {
        // Add empty bars inbetween if needed
        let skipped = 0;
        aggregated.push({
          y: sum,
          x: start.format(outputFormat)
        });
        while (
          moment(start).diff(moment(data[i].x, inputFormat), interval + "s") +
            skipped <
          -1
        ) {
          aggregated.push({
            y: 0,
            x: moment(start)
              .add(1 + skipped, interval + "s")
              .startOf(interval)
              .format(outputFormat)
          });
          skipped++;
        }

        sum = data[i].y;
        start = moment(data[i].x, inputFormat).startOf(interval);
      }
    }
    aggregated.push({ y: sum, x: start.format(outputFormat) });

    // Add empty bars at end if needed
    while (moment().diff(start.add(1, interval + "s"), interval + "s") > 0) {
      aggregated.push({ y: 0, x: start.format(outputFormat) });
    }
    return aggregated;
  };

  render() {
    let aggregated = this.aggregateData();

    return (
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          width={730}
          height={250}
          data={aggregated}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <XAxis dataKey="x" domain={["auto", "auto"]} name="Time" unit="" />
          <YAxis dataKey="y" name="Steps" unit="" type="number" />
          <Bar dataKey="y" name="Steps/hour" fill="#ff7300" />

          <Legend />
          <Tooltip cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BarPlotterV2;
