import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import Trends from "../../Utils/trends";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import "./trendGoalsCard.css";
import { connect } from "react-redux";
import aggregateData from "../../Utils/aggregateData";
import moment from "moment";

class Oversiktkort extends Component {
  oversiktContent = () => {
    let data = FakeGlucoseData();
    let upperLimit = 12;
    let lowerLimit = 5;
    let trendValue = 2;
    let goalValue = 75;
    let { mean, timeAbove, timeWithin, timeBelow } = Trends(
      data,
      upperLimit,
      lowerLimit
    );
    let currentValue =
      (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
    let unit = "%";
    let trends;
    let hasUpperLimit = true;
    let percentGoal;
    switch (this.props.datatype) {
      case "Blodsukker":
        data = FakeGlucoseData();
        upperLimit = 12;
        lowerLimit = 5;
        percentGoal = 65;
        trendValue = 2;
        goalValue = 75;
        trends = Trends(data, upperLimit, lowerLimit);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue =
          (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
        unit = "%";
        console.log("Blodsukker");
        hasUpperLimit = false;
        break;
      case "Insulin":
        data = this.props.patient.datasets[0].measurements;
        upperLimit = 20;
        lowerLimit = 5;
        trendValue = 2;
        goalValue = 75;
        trends = Trends(data, upperLimit, lowerLimit);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue =
          (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
        unit = "%";
        break;
      case "Skritt":
        data = this.props.patient.datasets[0].measurements;
        upperLimit = 1000000;
        lowerLimit = 10000;
        trendValue = 200;
        goalValue = 15000;
        let aggregated = aggregateData(
          data,
          "day",
          moment()
            .subtract(1, "week")
            .format("YYYY-MM-DDTHH:mm:ss"),
          moment().format("YYYY-MM-DDTHH:mm:ss"),
          "ddd"
        );
        trends = Trends(aggregated, upperLimit, lowerLimit);
        console.log(trends);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue = mean;
        unit = " skritt/dag";
        hasUpperLimit = false;
        break;
      case "Vekt":
        break;
      case "Blodtrykk":
        break;
      case "Karbohydrater":
        break;
      default:
    }
    // let sum = timeAbove + timeBelow + timeWithin;

    let COLORS = ["#A61E7B", "#569B7E", "#E38B21"];
    if (!hasUpperLimit) {
      COLORS = ["#569B7E", "#E38B21"];
    }

    const goalArrowPic = require("../../Images/goalArrow.svg");
    const downTrianglePic = require("../../Images/greenDownTriangle.svg");
    // let angles = [
    //   (-30 * Math.PI) / 180 + ((timeAbove / sum) * 240 * Math.PI) / 180,
    //   (-30 * Math.PI) / 180 +
    //     (((timeAbove + timeWithin) / sum) * 240 * Math.PI) / 180
    // ];
    let angles = [];
    let sum = 0;
    let pieData;
    if (hasUpperLimit) {
      sum = 40 + upperLimit - lowerLimit;
      angles = [
        (-30 * Math.PI) / 180 + ((20 / sum) * 240 * Math.PI) / 180,
        (-30 * Math.PI) / 180 +
          (((20 + upperLimit - lowerLimit) / sum) * 240 * Math.PI) / 180
      ];
      pieData = [
        { value: 20, name: "Time above" },
        { value: upperLimit - lowerLimit, name: "Time within" },
        { value: 20, name: "Time Below" }
      ];
    } else {
      sum = 20 + 100 - percentGoal;
      angles = [(-30 * Math.PI) / 180, Math.PI / 2, (210 * Math.PI) / 180];
      pieData = [
        { value: Math.min(20, 100 - percentGoal), name: "Time above" },
        { value: Math.min(20, percentGoal), name: "Time within" }
      ];
      angles = [
        0,
        ((-30 +
          (pieData[0].value / (pieData[0].value + pieData[1].value)) * 240) *
          Math.PI) /
          180
      ];
    }
    console.log(angles);
    return (
      <div className="flex-container-trend-goals outer-div-trend-goals">
        <ResponsiveContainer
          className="flex-children-trend-goals"
          width={250}
          height={220}
        >
          <PieChart width={1000} height={600}>
            <Pie
              // data={[
              //   { value: timeAbove, name: "Time above" },
              //   { value: timeWithin, name: "Time within" },
              //   { value: timeBelow, name: "Time Below" }
              // ]}
              data={pieData}
              dataKey="value"
              nameKey="name"
              startAngle={-30}
              endAngle={+210}
              innerRadius={60}
              outerRadius={80}
              fill="#979797"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 10 + innerRadius + (outerRadius - innerRadius);
                let x = cx + radius * Math.cos(-midAngle * RADIAN);
                let y = cy + radius * Math.sin(-midAngle * RADIAN);
                let returnString = "";
                if (index === 0) {
                  returnString = ""; //Math.max(20, percentGoal + 20);
                  x = cx + radius * Math.cos(-angles[index]);
                  y = cy + radius * Math.sin(-angles[index]);
                } else if (index === 1) {
                  returnString = percentGoal + "%";
                  x = cx + radius * Math.cos(-angles[index]);
                  y = cy + radius * Math.sin(-angles[index]);
                } else {
                  returnString = ""; //Math.min(20, percentGoal - 20);
                  x = cx + radius * Math.cos(-angles[index]);
                  y = cy + radius * Math.sin(-angles[index]);
                }
                console.log("cx: ", cx);
                console.log("cy: ", cy);
                console.log("radius: ", radius);
                return (
                  <React.Fragment>
                    <text
                      x={x}
                      y={y}
                      fill="#8884d8"
                      textAnchor="middle" //{x > cx ? "start" : "end"}
                      dominantBaseline="end"
                    >
                      {returnString}
                    </text>
                    <text
                      x={125 + 100 * Math.cos((-210 * Math.PI) / 180)}
                      y={110 + 100 * Math.sin((-210 * Math.PI) / 180)}
                      fill="#8884d8"
                      textAnchor="middle" //{x > cx ? "start" : "end"}
                      dominantBaseline="end"
                    >
                      {Math.min(0, percentGoal - 20) + "%"}
                    </text>
                    <text
                      x={125 + 105 * Math.cos((30 * Math.PI) / 180)}
                      y={110 + 105 * Math.sin((30 * Math.PI) / 180)}
                      fill="#8884d8"
                      textAnchor="middle" //{x > cx ? "start" : "end"}
                      dominantBaseline="end"
                    >
                      {Math.max(100, percentGoal + 20) + "%"}
                    </text>
                  </React.Fragment>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key="" fill={COLORS[index % COLORS.length]} />
              ))}{" "}
              />{" "}
              <Label
                value={Math.floor(currentValue) + unit}
                position="center"
              />
              <text
                x={125 + 90 * Math.cos((-210 * Math.PI) / 180)}
                y={110 + 90 * Math.sin((-210 * Math.PI) / 180)}
                fill="#8884d8"
                textAnchor="middle" //{x > cx ? "start" : "end"}
                dominantBaseline="end"
              >
                {Math.min(0, percentGoal - 20)}
              </text>
              <text
                x={125 + 90 * Math.cos((30 * Math.PI) / 180)}
                y={110 + 90 * Math.sin((30 * Math.PI) / 180)}
                fill="#8884d8"
                textAnchor="middle" //{x > cx ? "start" : "end"}
                dominantBaseline="end"
              >
                {Math.max(100, percentGoal + 20)}
              </text>
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-children-trend-goals flex-side-container-trend-goals">
          <div className="flex-children-trend-goals flex-container-trend-goals upper-trend-goals-div">
            <img
              src={goalArrowPic}
              alt={"logo"}
              className="index-Image flex-children-trend-goals trend-pic"
            />
            <div className="flex-children-trend-goals flex-side-container-trend-goals">
              <div className="flex-children-trend-goals">Mål:</div>
              <div className="flex-children-trend-goals">
                {percentGoal} {unit}
              </div>
            </div>
          </div>
          <div className="flex-children-trend-goals flex-container-trend-goals lower-trend-goals-div">
            <img
              src={downTrianglePic}
              alt={"logo"}
              className="index-Image flex-children trend-pic"
            />
            <div className="flex-children-trend-goals flex-side-container-trend-goals">
              <div className="flex-children-trend-goals">Trend:</div>
              <div className="flex-children-trend-goals">
                {trendValue} {unit}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <CardComponent title="Trender og Mål" content={this.oversiktContent()} />
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(Oversiktkort);
