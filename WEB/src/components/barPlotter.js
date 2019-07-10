import React, { Component } from "react";
import numeral from "numeral";
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

class BarPlotter extends Component {
  state = { colors: ["#7DB3FF", "#49457B", "#FF7C78"] };

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

  findMeasurementStartIndex = datasetIndex => {
    for (
      let i = 0;
      i < this.props.patient.datasets[datasetIndex].measurements.length;
      i++
    ) {
      if (
        moment().diff(
          moment(
            this.props.patient.datasets[datasetIndex].measurements[i].start,
            "YYYY-MM-DDTHH:mm:ss"
          ),
          this.props.timeScope + "s"
        ) < 1
      ) {
        return i;
      }
    }
    return 0;
  };

  findDatasetIndexFromLOINC = () => {
    for (let i = 0; i < this.props.patient.datasets.length; i++) {
      if (this.props.patient.datasets[i].name === this.props.datasetLOINC) {
        return i;
      }
    }
    console.log("No dataset with desired LOINC!");
    return 0;
  };

  formatStringsFromAggregateLength = () => {
    switch (this.props.aggregateLength) {
      case "week":
        return { startOf: "week", interval: "weeks", format: "ww" };
      case "day":
        if (this.props.timeScope === "month") {
          return { startOf: "day", interval: "days", format: "DD.MM" };
        } else if (this.props.timeScope === "year") {
          return { startOf: "day", interval: "days", format: "DD.MM" };
        } else {
          return { startOf: "day", interval: "days", format: "ddd" };
        }
      case "hour":
        if (this.props.timeScope === "month") {
          return { startOf: "hour", interval: "hours", format: "DD.MM" };
        } else if (this.props.timeScope === "week") {
          return { startOf: "hour", interval: "hours", format: "DD.MM" };
        } else {
          return { startOf: "hour", interval: "hours", format: "HH" };
        }
      default:
    }
    return { startOf: "day", interval: "days", format: "DD.MM" };
  };

  convertTimeScopeToNumber = () => {
    switch (this.props.timeScope) {
      case "year":
        switch (this.props.aggregateLength) {
          case "day":
            if (moment().isLeapYear()) {
              return 366;
            } else {
              return 365;
            }
          case "week":
            return 52;
          case "month":
            return 12;
          default:
        }
        break;
      case "week":
        return 7;
      case "day":
        return 24;
      case "month":
        return moment().daysInMonth();
      default:
        return 24;
    }
  };

  aggregateData = () => {
    let timeFormats = this.formatStringsFromAggregateLength();
    let datasetIndex = this.findDatasetIndexFromLOINC();
    let startIndex = this.findMeasurementStartIndex(datasetIndex);

    let slicedData = this.props.patient.datasets[
      datasetIndex
    ].measurements.slice(startIndex);
    let reformatted = [];
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
    let sum = reformatted[0].y;
    let start = moment(reformatted[0].x, "X").startOf(timeFormats.startOf);
    //console.log(start.format(timeFormats.format));
    // Add empty bars at start if needed
    let added = 0;
    while (
      moment().diff(start, this.props.aggregateLength) + added <
      this.convertTimeScopeToNumber()
    ) {
      aggregated.push({
        y: 0,
        x: moment()
          .subtract(
            this.convertTimeScopeToNumber() - added,
            timeFormats.interval
          )
          .format(timeFormats.format)
      });
      added++;
    }

    for (let i = 1; i < reformatted.length; i++) {
      if (
        start.diff(
          moment(reformatted[i].x, "X").startOf(timeFormats.startOf),
          timeFormats.interval
        ) > -1
      ) {
        sum += reformatted[i].y;
      } else {
        // Add empty bars inbetween if needed
        let skipped = 0;
        aggregated.push({
          y: sum,
          x: start.format(timeFormats.format)
        });
        while (
          moment(start).diff(
            moment(reformatted[i].x, "X"),
            timeFormats.interval
          ) +
            skipped <
          -1
        ) {
          aggregated.push({
            y: 0,
            x: moment(start)
              .add(1 + skipped, timeFormats.interval)
              .startOf(timeFormats.startOf)
              .format(timeFormats.format)
          });
          skipped++;
        }

        sum = reformatted[i].y;
        start = moment(reformatted[i].x, "X").startOf(timeFormats.startOf);
      }
    }
    aggregated.push({ y: sum, x: start.format(timeFormats.format) });
    // Add empty bars at end if needed
    while (
      moment().diff(start.add(1, timeFormats.interval), timeFormats.interval) >
      0
    ) {
      aggregated.push({ y: 0, x: start.format(timeFormats.format) });
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
          // might want to throw away the first element
          data={aggregated} //.slice(1, aggregated.length)}
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

function mapStateToProps(state) {
  return {
    patient: state.patient
  };
}

export default connect(mapStateToProps)(BarPlotter);
