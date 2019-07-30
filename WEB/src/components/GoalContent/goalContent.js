import "./goalContent.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ChangeGoalButton from "../../components/ChangeGoalButton/changeGoalButton";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import CardComponent from "../../components/Card/cardComponent";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import Trends from "../../Utils/trends";
import periodFromView from "../../Utils/periodFromView";
import aggregateData from "../../Utils/aggregateData";
import aggregateActivity from "../../Utils/aggregateActivity";

class GoalContent extends Component {
  CustomLabel(value1, value2, xPos) {
    return (
      <text dominantBaseline="central">
        <tspan x={65} y={70} alignmentBaseline="middle" fontSize="16">
          {value1}
        </tspan>
        <tspan x={xPos} y={90} alignmentBaseline="middle" fontSize="18">
          {value2}
        </tspan>
      </text>
    );
  }

  displayUnit = () => {
    switch (this.props.datatype) {
      case "Blodsukker":
        return "/dag";
      case "BlodsukkerAvg":
        return "mmol/l";
      case "Skritt":
        return "skritt";
      case "Vekt":
        return "kilogram";
      case "FysiskAktivitet":
        return "min/uke";
      case "Karbohydrater":
        return "gram/dag";
      case "Blodtrykk":
        return "mmHg/dag";
      default:
        return "Default";
    }
  };

  goalContent = () => {
    let generalColors = ["#E38B21", "#EEE05D", "#569B7E", "#EEE05D", "#E38B21"];
    let overColors = ["#E38B21", "#EEE05D", "#569B7E"];
    let underColors = ["#569B7E", "#EEE05D", "#E38B21"];
    let COLORS = [];
    let dataSet = [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }];

    let xPos;
    let data = FakeGlucoseData();
    let upperLimit = 12;
    let lowerLimit = 5;
    let goalValue = "undefined";
    let { mean, timeAbove, timeWithin, timeBelow } = Trends(
      data,
      upperLimit,
      lowerLimit
    );
    let currentValue =
      (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
    let unit = "%";
    let trends;
    let { periodName, periodNumber, intervalName } = periodFromView(
      this.props.baseInfo.view
    );

    switch (this.props.datatype) {
      case "Blodsukker":
        COLORS = overColors;
        dataSet = [{ value: 1 }, { value: 1 }, { value: 3 }];
        goalValue = this.props.patient.goals.BloodSugarWithinRangePercentageGoal.value; // 80
        xPos = 72;
        data = FakeGlucoseData();
        upperLimit = goalValue; // 12;
        lowerLimit = goalValue / 5; // 5;
        currentValue =
          (timeWithin * 100) / (timeAbove + timeWithin + timeBelow);
        unit = this.props.patient.goals.BloodSugarWithinRangePercentageGoal
          .unit;
        break;
      case "BlodsukkerAvg":
        COLORS = generalColors;
        goalValue = this.props.patient.goals.MeanGlucoseGoal.value; // 7
        unit = this.props.patient.goals.MeanGlucoseGoal.unit;
        xPos = 51;
        data = FakeGlucoseData();
        upperLimit = goalValue * 2; // 12;
        lowerLimit = goalValue / 2; // 6.2;
        trends = Trends(data, upperLimit, lowerLimit);
        mean = trends.mean;
        currentValue = mean;
        break;
      case "Skritt":
        COLORS = overColors;
        dataSet = [{ value: 1 }, { value: 1 }, { value: 3 }];
        goalValue = this.props.patient.goals.StepsGoal.value; // 10000
        xPos = 48;
        data = this.props.patient.datasets[0].measurements;
        upperLimit = goalValue; // 12000;
        lowerLimit = goalValue / 5; // 1000;
        let aggregated = aggregateData(
          data,
          intervalName,
          moment()
            .subtract(periodNumber, periodName)
            .format("YYYY-MM-DDTHH:mm:ss"),
          moment().format("YYYY-MM-DDTHH:mm:ss"),
          "ddd"
        );
        trends = Trends(aggregated, upperLimit, lowerLimit);
        mean = trends.mean;
        currentValue = mean;
        unit = this.props.patient.goals.StepsGoal.unit;
        break;
      case "Vekt":
        dataSet = [{ value: 2 }, { value: 2 }, { value: 1 }];
        COLORS = underColors;
        goalValue = this.props.patient.goals.WeightGoal.value; // 70
        unit = this.props.patient.goals.WeightGoal.unit;
        xPos = 67;
        data = this.props.patient.datasets[1].measurements;
        upperLimit = goalValue; // 70;
        lowerLimit = goalValue / 5; // 50;
        trends = Trends(data, upperLimit, lowerLimit);
        mean = trends.mean;
        currentValue = mean;
        break;
      case "FysiskAktivitet":
        COLORS = overColors;
        dataSet = [{ value: 1 }, { value: 1 }, { value: 3 }];
        goalValue = this.props.patient.goals.PhysicalActivityGoal.value; //630
        unit = this.props.patient.goals.PhysicalActivityGoal.unit;
        xPos = 58;
        data = this.props.patient.datasets[2].measurements;
        upperLimit = goalValue; // 70;
        lowerLimit = goalValue / 5; // 50;
        let aggregatedActivity = aggregateActivity(
          data,
          intervalName,
          moment()
            .subtract(periodNumber, periodName)
            .format("YYYY-MM-DDTHH:mm:ss"),
          moment().format("YYYY-MM-DDTHH:mm:ss"),
          "MM-DDTHH:mm"
        );
        currentValue = aggregatedActivity.length / 7;
        break;
      case "Karbohydrater":
        COLORS = generalColors;
        goalValue = this.props.patient.goals.CarbsGoal.value; //280;
        unit = this.props.patient.goals.CarbsGoal.unit;
        xPos = 70;
        break;
      default:
        return;
    }

    let arrowAngle;

    if (currentValue < lowerLimit) {
      arrowAngle = (-40 + (currentValue - lowerLimit) * 220) * (Math.PI / 180);
    } else if (currentValue > upperLimit) {
      arrowAngle = (-40 + (currentValue - upperLimit) * -40) * (Math.PI / 180);
    } else {
      arrowAngle =
        (-40 +
          ((currentValue - lowerLimit) / (currentValue - upperLimit)) * 260) *
        (Math.PI / 180);
    }

    let triangleAngle = (70 * Math.PI) / 180;
    let r = 20;
    let theta = 9;
    let radius = 45;

    let centerX = 87.5 + radius * Math.cos(-arrowAngle);
    let centerY = 80 + radius * Math.sin(-arrowAngle);
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
        <div className="split">
          <div className="circleBound">
            <div className="goalText">Mål:</div>
            <div className="goalPercentText">{goalValue}</div>
            <div className="unitText">{this.displayUnit()}</div>
          </div>
        </div>
        <div className="row split rowStyle">
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
                  <Label
                    position="center"
                    content={this.CustomLabel(
                      "Status: ",
                      Math.floor(currentValue) + " " + unit,
                      xPos
                    )}
                  />
                </Pie>
                <svg>
                  <polygon
                    points={pointString}
                    fill="#4F4F4F"
                    className="trend-polygon"
                  />
                </svg>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="button-style">
              <ChangeGoalButton datatype={this.props.datatype} />
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
