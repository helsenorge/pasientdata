import React, { Component } from "react";
//import { VictoryChart, VictoryGroup, VictoryArea } from "victory";
import numeral from "numeral";
import moment from "moment";
import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ScatterChart,
  Scatter,
  ResponsiveContainer
} from "recharts";

class PlotScatter extends Component {
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

  //dateFormatter = item => moment(item, "X").format("HH:mm"); // - hh:mm");

  timeFormatter = (timeScope, item) => {
    switch (timeScope) {
      case "month":
        return moment(item, "X").format("DD");
      case "week":
        return moment(item, "X").format("ddd");
      case "day":
        return moment(item, "X").format("HH:mm");
      default:
        return moment(item, "X").format("YYYY-MM-DDTHH:mm:ss");
    }
  };

  render() {
    //console.log(this.props.datasets);
    let startIndex = 0;
    let timeScope = "week";
    switch (timeScope) {
      case "week":
        startIndex = this.findIndexOfOneWeekAgo(
          this.props.datasets[0].measurements
        );
        break;
      case "day":
        startIndex = this.findIndexOfOneDayAgo(
          this.props.datasets[0].measurements
        );
        break;
      default:
        break;
    }
    let slicedData = this.props.datasets[0].measurements.slice(startIndex);

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
    //slicedData = [
    //  { value: 10, start: 1562153446 },
    //  { value: 10, start: 1562153681 }
    //];
    //console.log(reformatted);
    return (
      //   <ResponsiveContainer width="100%" height={300}>
      //     <ScatterChart
      //       width={730}
      //       height={250}
      //       margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      //     >
      //       <XAxis
      //         tickFormatter={this.dateFormatter}
      //         dataKey="x"
      //         //minTickGap="6"
      //         name="Time"
      //         unit="" //"s"
      //         type="number"
      //         data={{ y: slicedData.value, x: nanos }}
      //       />
      //       <YAxis
      //         tickFormatter={this.numberFormatter}
      //         dataKey="y"
      //         name="Steps"
      //         unit="" // "Steps/min"
      //         type="number"
      //         data={{ y: slicedData.value, x: nanos }}
      //       />
      //       <Scatter
      //         // stackId="a"
      //         //dataKey="y"
      //         name="Steps"
      //         // fill={this.state.colors[1]}
      //         data={{ y: slicedData.value, x: nanos }}
      //       />

      //       <Legend />
      //       <Tooltip
      //       //labelFormatter={this.dateFormatter}
      //       //formatter={this.numberFormatter}
      //       />
      //     </ScatterChart>
      //   </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          width={1000}
          height={400}
          margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
        >
          <XAxis
            type="number"
            dataKey="x"
            name="stature"
            unit=""
            domain={["auto", "auto"]}
            tickFormatter={item => this.timeFormatter(timeScope, item)}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="weight"
            unit=""
            domain={["auto", "auto"]}
          />
          {/* <ZAxis
          type="number"
          dataKey="z"
          range={[50, 1200]}
          name="score"
          unit="km"
        /> */}
          {/* <CartesianGrid /> */}
          <Scatter
            name="Steps"
            data={reformatted}
            fillOpacity={0.9}
            fill="#ff7300"
          />
          <Tooltip />
          <Legend />
          {/* <ReferenceArea x1={250} x2={300} alwaysShow label="any label" /> */}
          {/* <ReferenceLine x={159} stroke="red" /> */}
          {/* <ReferenceLine y={237.5} stroke="red" /> */}
          {/* <ReferenceDot
          x={170}
          y={290}
          r={15}
          label="AB"
          stroke="none"
          fill="red"
          isFront
        /> */}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default PlotScatter;
