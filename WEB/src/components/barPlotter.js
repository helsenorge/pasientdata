import React, { Component } from "react";
import numeral from "numeral";
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

class BarPlotter extends Component {
  state = { colors: ["#7DB3FF", "#49457B", "#FF7C78"] };

  findIndexOfOneWeekAgo(dataset) {
    for (let i = 0; i < dataset.length; i++) {
      if (
        moment().diff(
          moment(dataset[i].start, "YYYY-MM-DDTHH:mm:ss"),
          "weeks"
        ) < 1
      ) {
        return i;
      }
    }
    return 0;
  }

  findIndexOfOneDayAgo(dataset) {
    for (let i = 0; i < dataset.length; i++) {
      if (
        moment().diff(moment(dataset[i].start, "YYYY-MM-DDTHH:mm:ss"), "days") <
        1
      ) {
        return i;
      }
    }
    return 0;
  }

  numberFormatter = item => numeral(item).format("O");

  timeFormatter = (timeScope, item) => {
    switch (timeScope) {
      case "month":
        return moment(item, "X").format("DD");
      case "week":
        return moment(item, "X").format("ddd");
      case "day":
        return moment(item, "X").format("HH:mm");
      case "hours":
        return moment(item, "X").format("HH");
      default:
        return moment(item, "X").format("YYYY-MM-DDTHH:mm:ss");
    }
  };

  findMeasurementStartIndex = () => {
    switch (this.props.timeScope) {
      case "week":
        return this.findIndexOfOneWeekAgo(this.props.datasets[0].measurements);
      case "day":
        return this.findIndexOfOneDayAgo(this.props.datasets[0].measurements);
      default:
        return 0;
    }
  };

  findDatasetIndexFromLOINC = () => {
    for (let i = 0; i < this.props.datasets.length; i++) {
      if (this.props.datasets[i].name === this.props.datasetLOINC) {
        return i;
      }
    }
    console.log("No dataset with desired LOINC!");
    return 0;
  };

  formatStringsFromAggregateLength = () => {
    switch (this.props.aggregateLength) {
      case "day":
        return { startOf: "day", interval: "days", format: "ddd" };
      case "hour":
        return { startOf: "hour", interval: "hours", format: "ddd" };
      default:
        return { startOf: "day", interval: "days", format: "ddd" };
    }
  };

  render() {
    let datasetIndex = this.findDatasetIndexFromLOINC();
    let startIndex = this.findMeasurementStartIndex();

    let slicedData = this.props.datasets[datasetIndex].measurements.slice(
      startIndex
    );
    let reformatted = [];
    //console.log(slicedData);
    for (let i = 0; i < slicedData.length; i++) {
      reformatted.push({
        x: parseInt(
          moment(slicedData[i].start, "YYYY-MM-DDTHH:mm:ss").format("X"),
          10
        ),
        y: slicedData[i].value
      });
    }

    /*
    / Loop through the desired dataset and aggregate
    */
    let aggregated = [];
    let timeFormats = this.formatStringsFromAggregateLength();
    let sum = reformatted[0].y;
    let start = moment(reformatted[0].x, "X").startOf(timeFormats.startOf);
    for (let i = 1; i < reformatted.length; i++) {
      if (
        start.diff(
          moment(reformatted[i].x, "X").startOf(timeFormats.startOf),
          timeFormats.interval
        ) > -1
      ) {
        sum += reformatted[i].y;
      } else {
        aggregated.push({
          y: sum,
          x: start.format(timeFormats.format)
        });
        sum = reformatted[i].y;
        start = moment(reformatted[i].x, "X").startOf(timeFormats.startOf);
      }
    }
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
      // <ResponsiveContainer width="100%" height={300}>
      //   <ScatterChart
      //     width={1000}
      //     height={400}
      //     margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
      //   >
      //     <XAxis
      //       type="number"
      //       dataKey="x"
      //       name="Unix timestamp"
      //       unit=""
      //       domain={["auto", "auto"]}
      //       tickFormatter={item => this.timeFormatter(timeScope, item)}
      //     />
      //     <YAxis
      //       type="number"
      //       dataKey="y"
      //       name="Steps in interval"
      //       unit=""
      //       domain={["auto", "auto"]}
      //     />
      //     <Scatter
      //       name="Steps"
      //       data={reformatted}
      //       fillOpacity={0.0}
      //       fill="#ff7300"
      //       line
      //     />
      //     <Tooltip />
      //     <Legend />
      //   </ScatterChart>
      // </ResponsiveContainer>
    );
  }
}

export default BarPlotter;
