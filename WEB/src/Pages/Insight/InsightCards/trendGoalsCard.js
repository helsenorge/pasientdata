import React, { Component } from "react";
import CardComponent from "../../../Components/Card/cardComponent";
import FakeGlucoseData from "../../../Utils/fakeGlucose";
import Trends from "../../../Utils/trends";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./trendGoalsCard.css";
import { connect } from "react-redux";
import {
  INSULIN,
  STEPS,
  WEIGHT,
  CARBOHYDRATES,
  PHYSICAL_ACTIVITY
} from "../../../dataTypes";
import { getAggregatedDataForDataType } from "../../../Utils/aggregatedDataForDataType";

/*
 * Calculates trends and renders the trend card. Most of the calculations is figuring out the
 * look of the goal speedometer.
 */

class TrendGoalsCard extends Component {
  displayUnit = () => {
    switch (this.props.datatype) {
      case "Blodsukker":
        return "";
      case "Insulin":
        return "";
      case "Skritt":
        return "skritt/dag";
      case "Vekt":
        return "";
      case "FysiskAktivitet":
        return "";
      case "Karbohydrater":
        return "";
      default:
        return "Default";
    }
  };

  trendGoalsContent = () => {
    // Getting the data, goals and such needed for each use case. Also calculates trends.

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
    let unitMiddle = "%";
    let trends;
    let hasUpperLimit = true;
    let upperGoal = 80;
    let lowerGoal = 70;
    let pieSideSize = 20;
    let lowerIsBetter = false;
    switch (this.props.datatype) {
      case "Blodsukker":
        data = FakeGlucoseData();
        trendValue = 2;
        goalValue = this.props.patient.goals.BloodSugarWithinRangePercentageGoal
          .value;
        lowerLimit = this.props.patient.goals.BloodSugarRangeGoal.lower;
        upperLimit = this.props.patient.goals.BloodSugarRangeGoal.upper;
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
        data = getAggregatedDataForDataType(
          this.props.baseInfo,
          this.props.patient.datasets,
          INSULIN,
          "trend"
        );
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
          ((timeAbove + timeWithin - timeBelow) * 100) /
          (timeAbove + timeWithin + timeBelow);
        unit = "%";
        upperGoal = 90;
        lowerGoal = 70;
        break;
      case "Skritt":
        hasUpperLimit = false;
        aggregated = getAggregatedDataForDataType(
          this.props.baseInfo,
          this.props.patient.datasets,
          STEPS,
          "trend"
        );
        upperLimit = 10000000;
        lowerLimit = 15000;
        goalValue = this.props.patient.goals.StepsGoal.value;
        trendValue = 200;
        trends = Trends(aggregated, upperLimit, lowerLimit);
        let prevAggregated = getAggregatedDataForDataType(
          this.props.baseInfo,
          this.props.patient.datasets,
          STEPS,
          "prevInnsight"
        );
        let prevTrends = Trends(prevAggregated, upperLimit, lowerLimit);
        mean = trends.mean;
        timeAbove = trends.timeAbove;
        timeWithin = trends.timeWithin;
        timeBelow = trends.timeBelow;
        currentValue = mean;
        trendValue = mean - prevTrends.mean;
        unit = "";
        unitMiddle = "skritt";
        pieSideSize = Math.floor(Math.abs(goalValue - currentValue + 1000) / 1000) * 1000;
        break;
      case "Vekt":
        unit = " kg";
        unitMiddle = "kg";
        pieSideSize = 20;
        data = getAggregatedDataForDataType(
          this.props.baseInfo,
          this.props.patient.datasets,
          WEIGHT,
          "trend"
        );
        goalValue = this.props.patient.goals.WeightGoal.value;
        hasUpperLimit = false;
        lowerIsBetter = true;
        currentValue = 0;
        data.forEach(e => currentValue = currentValue + e.y);
        currentValue = currentValue / data.length;
        break;
      case "Karbohydrater":
        data = getAggregatedDataForDataType(
          this.props.baseInfo,
          this.props.patient.datasets,
          CARBOHYDRATES,
          "trend"
        );
        unitMiddle = "g";
        goalValue = this.props.patient.goals.CarbsGoal.value;
        unit = " g";
        hasUpperLimit = false;
        lowerIsBetter = true;
        currentValue = 0;
        data.forEach(e => currentValue = currentValue + e.y);
        currentValue = currentValue / data.length;
        pieSideSize = (Math.floor(Math.abs(goalValue - currentValue + 100) / 100) * 100);
        break;
      case "FysiskAktivitet":
        unitMiddle = "min";
        unit = " min";
        data = getAggregatedDataForDataType(
          this.props.baseInfo,
          this.props.patient.datasets,
          PHYSICAL_ACTIVITY,
          "trend"
        );
        goalValue = this.props.patient.goals.PhysicalActivityGoal.value;
        hasUpperLimit = false;
        currentValue = 0;
        data.forEach(e => currentValue = currentValue + e.y);
        currentValue = currentValue / (data.length / 7);
        pieSideSize = Math.floor(Math.abs(goalValue - currentValue + 100) / 100) * 100;
        break;
      default:
    }

    pieSideSize = pieSideSize || 20;

    // Deciding which colors to use.

    let COLORS = ["#A61E7B", "#569B7E", "#E38B21"];
    if (!hasUpperLimit) {
      COLORS = ["#569B7E", "#E38B21"];
    }
    if (lowerIsBetter) {
      COLORS = ["#E38B21", "#569B7E"];
    }

    const goalArrowPic = require("../../../Images/goalArrow.svg");
    const upTrianglePic = require("../../../Images/greenUpTriangle.svg");
    const downTrianglePic = require("../../../Images/yellowDownTriangle.svg");
    let angles = [];
    let pieData;
    let lowerTextValue;
    let upperTextValue;
    let lowerText;
    let upperText;
    let goalText;

    // Calculating limits, and where to put arrows and labels.
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
        upperTextValue = parseInt(goalValue) + parseInt(pieSideSize);
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

    // Calculating positions of the vertices of the polygon making up the triangle.

    let triangleAngle = (70 * Math.PI) / 180;
    let r = 20;
    let theta = 9;
    let radius = 60;

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
              innerRadius={75}
              outerRadius={90}
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
                      x={cx + 95 * Math.cos(-angles[index])}
                      y={cy + 95 * Math.sin(-angles[index])}
                      fill="#569B7E"
                      textAnchor="middle"
                      dominantBaseline="end"
                      className="caption"
                    >
                      {returnString}
                    </text>
                    <text
                      x={cx + 110 * Math.cos((-210 * Math.PI) / 180)}
                      y={cy + 110 * Math.sin((-210 * Math.PI) / 180)}
                      fill="#7D8081"
                      textAnchor="middle"
                      dominantBaseline="end"
                      className="caption"
                    >
                      {lowerText}
                    </text>
                    <text
                      x={cx + 110 * Math.cos((30 * Math.PI) / 180)}
                      y={cy + 110 * Math.sin((30 * Math.PI) / 180)}
                      fill="#7D8081"
                      textAnchor="middle"
                      dominantBaseline="end"
                      className="caption"
                    >
                      {upperText}
                    </text>
                    <text
                      x={cx}
                      y={cy + 15}
                      fill="#000000"
                      textAnchor="middle"
                      dominantBaseline="end"
                      className="caption" // "distance-to-goal-text"
                    >
                      {goalValue - Math.floor(currentValue) > 0
                        ? Math.abs(goalValue - Math.floor(currentValue)) +
                          " " +
                          unitMiddle +
                          " under målet"
                        : Math.abs(goalValue - Math.floor(currentValue)) +
                          " " +
                          unitMiddle +
                          " over målet"}
                    </text>
                    <text
                      x={cx}
                      y={cy - 5}
                      fill="#000000"
                      textAnchor="middle"
                      dominantBaseline="end"
                      className="large-numerical-value"
                    >
                      {Math.floor(currentValue) + unit}
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
          <div className="flex-parent-upper-right upper-trend-goals-div">
            <div className="flex-children-trend-goals flex-container-trend-goals ">
              <img
                src={goalArrowPic}
                alt={"logo"}
                className="index-Image flex-children trend-pic"
              />
              <div className="flex-children-trend-goals subheader">Mål:</div>
            </div>
            <br />
            <div className="flex-children-trend-goals flex-side-container-trend-goals">
              <div className="flex-children-trend-goals large-numerical-value">
                {goalText}
              </div>
              <br />
            </div>
          </div>
          <div className="flex-parent-upper-right">
            <br />
            <div className="flex-children-trend-goals flex-container-trend-goals lower-trend-goals-div">
              <img
                src={trendValue > 0 ? upTrianglePic : downTrianglePic}
                alt={"logo"}
                className="index-Image flex-children trend-pic"
              />
              <div className="flex-children-trend-goals subheader">Trend:</div>
            </div>
            <br />
            <div className="flex-children-trend-goals flex-side-container-trend-goals">
              <div className="flex-children-trend-goals large-numerical-value">
                {Math.floor(trendValue)} {unit}
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
