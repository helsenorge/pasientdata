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
    let upperGoal = 80;
    let lowerGoal = 70;
    let pieSideSize = 20;
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
        upperGoal = 90;
        lowerGoal = 70;
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
        pieSideSize = 2000;
        break;
      case "Vekt":
        break;
      case "Blodtrykk":
        break;
      case "Karbohydrater":
        break;
      default:
    }

    let COLORS = ["#A61E7B", "#569B7E", "#E38B21"];
    if (!hasUpperLimit) {
      COLORS = ["#569B7E", "#E38B21"];
    }

    const goalArrowPic = require("../../Images/goalArrow.svg");
    const downTrianglePic = require("../../Images/greenDownTriangle.svg");
    let angles = [];
    let pieData;
    let lowerText;
    let upperText;
    let goalText;
    if (hasUpperLimit) {
      if (unit === "%") {
        pieData = [
          { value: Math.min(pieSideSize, 100 - upperGoal), name: "Time above" },
          { value: upperGoal - lowerGoal, name: "Time within" },
          { value: Math.min(pieSideSize, lowerGoal), name: "Time Below" }
        ];
        lowerText = Math.max(0, lowerGoal - pieSideSize) + unit;
        upperText = Math.min(100, upperGoal + pieSideSize) + unit;
        goalText = lowerGoal + unit + " - " + upperGoal + unit;
      } else {
        pieData = [
          { value: pieSideSize, name: "Time above" },
          { value: upperGoal - lowerGoal, name: "Time within" },
          {
            value: Math.min(
              currentValue - pieSideSize,
              lowerGoal - pieSideSize
            ),
            name: "Time Below"
          }
        ];
      }
      angles = [
        ((-30 +
          (pieData[0].value /
            (pieData[0].value + pieData[1].value + pieData[2].value)) *
            240) *
          Math.PI) /
          180,
        ((-30 +
          ((pieData[0].value + pieData[1].value) /
            (pieData[0].value + pieData[1].value + pieData[2].value)) *
            240) *
          Math.PI) /
          180,
        0
      ];
    } else {
      if (unit === "%") {
        pieData = [
          { value: Math.min(pieSideSize, 100 - goalValue), name: "Time above" },
          { value: Math.min(pieSideSize, goalValue), name: "Time within" }
        ];
        lowerText = Math.max(0, goalValue - pieSideSize) + unit;
        upperText = Math.min(100, goalValue + pieSideSize) + unit;
        goalText = goalValue + unit;
      } else {
        pieData = [
          { value: pieSideSize, name: "Time above" },
          { value: pieSideSize, name: "Time within" }
        ];
      }
      angles = [
        0,
        ((-30 +
          (pieData[0].value / (pieData[0].value + pieData[1].value)) * 240) *
          Math.PI) /
          180,
        0
      ];
      goalText = goalValue + " " + unit;
    }
    console.log("angles: ", angles);
    console.log("pieData: ", pieData);

    return (
      <div className="flex-container-trend-goals outer-div-trend-goals">
        <ResponsiveContainer
          className="flex-children-trend-goals"
          width={250}
          height={220}
        >
          <PieChart width={1000} height={600}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              startAngle={-30}
              endAngle={+210}
              innerRadius={60}
              outerRadius={80}
              fill="#979797"
              label={({ cx, cy, index }) => {
                let returnString = "";
                if (index === 0) {
                  if (hasUpperLimit) {
                    returnString = upperGoal + unit;
                  } else {
                    returnString = "";
                  }
                } else if (index === 1) {
                  if (hasUpperLimit) {
                    returnString = lowerGoal + unit;
                  } else {
                    returnString = goalValue + unit;
                  }
                } else {
                  returnString = "";
                }

                return (
                  <React.Fragment>
                    <text
                      x={cx + 90 * Math.cos(-angles[index])}
                      y={cy + 90 * Math.sin(-angles[index])}
                      fill="#8884d8"
                      textAnchor="middle"
                      dominantBaseline="end"
                    >
                      {returnString}
                    </text>
                    <text
                      x={cx + 100 * Math.cos((-210 * Math.PI) / 180)}
                      y={cy + 100 * Math.sin((-210 * Math.PI) / 180)}
                      fill="#8884d8"
                      textAnchor="middle"
                      dominantBaseline="end"
                    >
                      {lowerText}
                    </text>
                    <text
                      x={cx + 105 * Math.cos((30 * Math.PI) / 180)}
                      y={cy + 105 * Math.sin((30 * Math.PI) / 180)}
                      fill="#8884d8"
                      textAnchor="middle"
                      dominantBaseline="end"
                    >
                      {upperText}
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
              <div className="flex-children-trend-goals">{goalText}</div>
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
