import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import Trends from "../../Utils/trends";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import "./trendGoalsCard.css";

class Oversiktkort extends Component {
  oversiktContent = () => {
    if (this.props.datatype === "Blodsukker") {
      const data = FakeGlucoseData();
      const upperLimit = 12;
      const lowerLimit = 5;

      const { mean, timeAbove, timeWithin, timeBelow } = Trends(
        data,
        upperLimit,
        lowerLimit
      );
      const COLORS = ["#A61E7B", "#569B7E", "#E38B21"];
      const goalArrowPic = require("../../Images/goalArrow.svg");
      const downTrianglePic = require("../../Images/downTriangle.svg");
      const trendValue = 2;
      const currentValue =
        (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
      const goalValue = 75;
      return (
        <div className="flex-container-trend-goals outer-div-trend-goals">
          <ResponsiveContainer
            className="flex-children-trend-goals"
            width={250}
            height={180}
          >
            <PieChart width={1000} height={500}>
              <Pie
                data={[
                  { value: timeBelow, name: "Time below" },
                  { value: timeWithin, name: "Time within" },
                  { value: timeAbove, name: "Time above" }
                ]}
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
                  let x = cx + radius * Math.cos(-midAngle * 2 * RADIAN);
                  let y = cy + radius * Math.sin(-midAngle * 2 * RADIAN);
                  let returnString = "";
                  if (index === 2) {
                    returnString = upperLimit;
                    x = cx + radius * Math.cos(-midAngle * 1.955 * RADIAN);
                    y = cy + radius * Math.sin(-midAngle * 1.955 * RADIAN);
                  } else if (index === 1) {
                    returnString = lowerLimit;
                    x = cx + radius * Math.cos(-midAngle * 2 * RADIAN);
                    y = cy + radius * Math.sin(-midAngle * 2 * RADIAN);
                  }
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#8884d8"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="end"
                    >
                      {returnString}
                    </text>
                  );
                }}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key="" fill={COLORS[index % COLORS.length]} />
                ))}{" "}
                /> <Label value={currentValue + "%"} position="center" />
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
                <div className="flex-children-trend-goals">{goalValue} %</div>
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
                <div className="flex-children-trend-goals">{trendValue} %</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return "Under construction...";
  };

  render() {
    return (
      <CardComponent title="Trender og Mål" content={this.oversiktContent()} />
    );
  }
}

export default Oversiktkort;
