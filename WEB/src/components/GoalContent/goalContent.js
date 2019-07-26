import "./goalContent.css";
import React, { Component } from "react";

import { connect } from "react-redux";
import ChangeGoalButton from "../../components/ChangeGoalButton/changeGoalButton";
import {
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
  Polygon
} from "recharts";
import CardComponent from "../../components/Card/cardComponent";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import Trends from "../../Utils/trends";

class GoalContent extends Component {
  displayUnit = () => {
    switch (this.props.datatype) {
      case "Blodsukker":
        return "%";
      case "BlodsukkerAvg":
        return "mmol/l";
      case "Skritt":
        return "skritt";
      case "Vekt":
        return "kg";
      case "FysiskAktivitet":
        return "min";
      case "Karbohydrater":
        return "g";
      case "Blodtrykk":
        return "mmHg";
      default:
        return "Default";
    }
  };

  goalContent = () => {
    let generalColors = ["#E38B21", "#EEE05D", "#569B7E", "#EEE05D", "#E38B21"];
    let physicalActiveColors = ["#E38B21", "#EEE05D", "#569B7E"];
    let COLORS = [];
    let dataSet = [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 }
    ];
    let goalText;

    switch (this.props.datatype) {
      case "Blodsukker":
        COLORS = generalColors;
        // data = FakeGlucoseData();
        // upperLimit = 12;
        // lowerLimit = 5;
        // percentGoal = 65;
        // trendValue = 2;
        // goalValue = 85;
        // trends = Trends(data, upperLimit, lowerLimit);
        // mean = trends.mean;
        // timeAbove = trends.timeAbove;
        // timeWithin = trends.timeWithin;
        // timeBelow = trends.timeBelow;
        // currentValue =
        //   (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
        // unit = "%";
        // hasUpperLimit = false;
        break;
      case "BlodsukkerAvg":
        COLORS = generalColors;
        break;
      case "Skritt":
        COLORS = physicalActiveColors;
        dataSet = [{ value: 1 }, { value: 2 }, { value: 2 }];
        break;
      case "Vekt":
        COLORS = generalColors;
        break;
      case "FysiskAktivitet":
        COLORS = physicalActiveColors;
        dataSet = [{ value: 1 }, { value: 2 }, { value: 2 }];
        break;
      case "Karbohydrater":
        COLORS = generalColors;
        break;
      case "Blodtrykk":
        COLORS = generalColors;
        break;
      default:
        return;
    }

    return (
      <div className="flex-container-trend-goals outer-div-trend-goals">
        <div className="split">
          <div className="circleBound">
            <div className="goalText">Mål:</div>
            <div className="goalPercentText">
              {this.props.patient.goals[0].value}
            </div>
            <div className="goalText">/dag</div>
          </div>
        </div>
        <div className="row split">
          <div className="pieChartStyle">
            <ResponsiveContainer
              className="flex-children-trend-goals"
              width={175}
              height={160}
            >
              <PieChart>
                <Pie
                  data={dataSet}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={68}
                  outerRadius={80}
                  startAngle={220}
                  endAngle={-40}
                  fill="#8884d8"
                >
                  {dataSet.map((entry, index) => (
                    <Cell key="" fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Label value={"status:"} position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="button-style">
              {/* <Link to={link} style={{ borderBottom: "none" }}> */}
              <ChangeGoalButton />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <CardComponent title={this.props.title} content={this.goalContent()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(GoalContent);

// let triangleAngle = (70 * Math.PI) / 180; // går og litt på bredde
// let r = 20; // lengde pil
// let theta = 9; // ish bredde
// let radius = 40; // hvor langt unna center

// let centerX = 125 + radius * Math.cos(-arrowAngle);
// let centerY = 110 + radius * Math.sin(-arrowAngle);
// let x1 = Math.floor(centerX + r * Math.cos(-arrowAngle));
// let y1 = Math.floor(centerY + r * Math.sin(-arrowAngle));
// let x2 = Math.floor(
//   centerX + theta * Math.cos(-arrowAngle - triangleAngle)
// );
// let y2 = Math.floor(
//   centerY + theta * Math.sin(-arrowAngle - triangleAngle)
// );
// let x3 = Math.floor(
//   centerX + theta * Math.cos(-arrowAngle + triangleAngle)
// );
// let y3 = Math.floor(
//   centerY + theta * Math.sin(-arrowAngle + triangleAngle)
// );

// <svg>
// <polygon
//   points={pointString}
//   fill="#4F4F4F"
//   className="trend-polygon"
// />{" "}
// </svg>
