import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import Trends from "../../Utils/trends";
import {
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
  Polygon
} from "recharts";
import "./trendGoalsCard.css";
import { connect } from "react-redux";
import aggregateData from "../../Utils/aggregateData";
import periodFromView from "../../Utils/periodFromView";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import findStartAndEndIndex from "../../Utils/findStartAndEndIndex";

class TrendGoalsCard extends Component {
  displayUnit = () => {
    switch (this.props.datatype) {
      case "Blodsukker":
        return "%";
      case "Insulin":
        return "%";
      case "Skritt":
        return "skritt/dag";
      case "Blodsukker":
        return "%";
      default:
        return "Default";
    }
  };

  trendGoalsContent = () => {
    let data = FakeGlucoseData();
    let aggregated;
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
    //let percentGoal;
    let upperGoal = 80;
    let lowerGoal = 70;
    let pieSideSize = 20;
    //let { intervalName } = periodFromView(this.props.baseInfo.view);
    let { start, end } = getStartEndTimes(
      this.props.baseInfo.view,
      this.props.baseInfo.nrOfIntervalsBack
    );

    switch (this.props.datatype) {
      case "Blodsukker":
        data = FakeGlucoseData();
        upperLimit = 12;
        lowerLimit = 5;
        //percentGoal = 65;
        trendValue = 2;
        goalValue = 85;
        trends = Trends(data, upperLimit, lowerLimit);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue =
          (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
        unit = "%";
        hasUpperLimit = false;
        break;
      case "Insulin":
        data = this.props.patient.datasets[0].measurements;
        upperLimit = 20;
        lowerLimit = 5;
        trendValue = 2;
        goalValue = 75;
        //aggregated = aggregateData(data, intervalName, start, end, "ddd");
        //console.log(aggregated);
        const { startIndex, endIndex } = findStartAndEndIndex(data, start, end);

        let slicedData = data.slice(startIndex, endIndex);
        trends = Trends(slicedData, upperLimit, lowerLimit);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue =
          ((timeAbove + timeWithin - timeBelow) * 100) /
          (timeAbove + timeWithin + timeBelow);
        unit = "%";
        upperGoal = 90;
        lowerGoal = 70;
        break;
      case "Skritt":
        hasUpperLimit = false;
        data = this.props.patient.datasets[0].measurements;
        upperLimit = 10000000;
        if (this.props.patient.goals.StepsGoal) {
          lowerLimit = this.props.patient.goals.StepsGoal.value;
        } else {
          console.log("No steps goal found in redux store.");
          lowerLimit = 15000; // default case if no goal exist in redux store.
        }
        trendValue = 200;
        goalValue = 15000;
        aggregated = aggregateData(data, "day", start, end, "ddd");
        trends = Trends(aggregated, upperLimit, lowerLimit);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue = mean;
        unit = "";
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
    let lowerTextValue;
    let upperTextValue;
    let lowerText;
    let upperText;
    let goalText;
    if (hasUpperLimit) {
      if (unit === "%") {
        pieData = [
          { value: Math.min(pieSideSize, 100 - upperGoal) },
          { value: upperGoal - lowerGoal },
          { value: Math.min(pieSideSize, lowerGoal) }
        ];
        lowerTextValue = Math.max(0, lowerGoal - pieSideSize);
        upperTextValue = Math.min(100, upperGoal + pieSideSize);
        goalText = lowerGoal + unit + " - " + upperGoal + unit;
      } else {
        pieData = [
          { value: pieSideSize },
          { value: upperGoal - lowerGoal },
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
      // only lower limit
      if (unit === "%") {
        pieData = [
          { value: Math.min(pieSideSize, 100 - goalValue) },
          { value: Math.min(pieSideSize, goalValue) }
        ];
        lowerTextValue = Math.max(0, goalValue - pieSideSize);
        upperTextValue = Math.min(100, goalValue + pieSideSize);
        goalText = goalValue + unit;
      } else {
        pieData = [{ value: pieSideSize }, { value: pieSideSize }];
        lowerTextValue = Math.max(0, goalValue - pieSideSize);
        upperTextValue = goalValue + pieSideSize;
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
    lowerText = lowerTextValue + unit;
    upperText = upperTextValue + unit;

    let arrowAngle;
    let arrowOutsideRangeSpacing = 5;

    if (currentValue < lowerTextValue) {
      arrowAngle = ((210 + arrowOutsideRangeSpacing) * Math.PI) / 180;
    } else if (currentValue > upperTextValue) {
      arrowAngle = ((-30 - arrowOutsideRangeSpacing) * Math.PI) / 180;
    } else {
      arrowAngle =
        ((-30 +
          ((upperTextValue - currentValue) /
            (upperTextValue - lowerTextValue)) *
            240) *
          Math.PI) /
        180;
    }

    let triangleAngle = (70 * Math.PI) / 180;
    let r = 20;
    let theta = 9;
    let radius = 40;

    let centerX = 125 + radius * Math.cos(-arrowAngle);
    let centerY = 110 + radius * Math.sin(-arrowAngle);
    let x1 = Math.floor(centerX + r * Math.cos(-arrowAngle));
    let y1 = Math.floor(centerY + r * Math.sin(-arrowAngle));
    let x2 = Math.floor(
      centerX + theta * Math.cos(-arrowAngle - triangleAngle)
    );
    let y2 = Math.floor(
      centerY + theta * Math.sin(-arrowAngle - triangleAngle)
    );
    let x3 = Math.floor(
      centerX + theta * Math.cos(-arrowAngle + triangleAngle)
    );
    let y3 = Math.floor(
      centerY + theta * Math.sin(-arrowAngle + triangleAngle)
    );

    let pointString = x1 + " " + y1 + " " + x2 + " " + y2 + " " + x3 + " " + y3;

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
            <svg>
              <polygon
                points={pointString}
                fill="#4F4F4F"
                className="trend-polygon"
              />{" "}
            </svg>
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
      <CardComponent
        title={"Trender og Mål: " + this.displayUnit()}
        content={this.trendGoalsContent()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(TrendGoalsCard);
