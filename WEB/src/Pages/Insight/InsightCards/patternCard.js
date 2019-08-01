import React, { Component } from "react";
import CardComponent from "../../../Components/Card/cardComponent";
import "./patternCard.css";
import { getAggregatedDataForDataType } from "../../../Utils/aggregatedDataForDataType";
import { connect } from "react-redux";
import { getGoal, BLOODSUGAR } from "../../../dataTypes";

class PatternCard extends Component {
  patternCardContent = () => {
    const squigglyLinePic = require("../../../Images/squigglyPatternIcon.svg");
    const triangleUpPic = require("../../../Images/pinkUpTriangle.svg");
    const triangleDownPic = require("../../../Images/pinkDownTriangle.svg");

    let view = this.props.view;
    let goals = this.props.goals;

    const aggregatedData = getAggregatedDataForDataType(
      this.props.baseInfo,
      this.props.patient.datasets,
      this.props.dataType,
      "insight",
      "YYYY-MM-DDTHH:mm:ss"
    );

    let fluctuationText;
    if (this.props.fluctuation !== "none") {
      fluctuationText = this.props.fluctuation(view, aggregatedData, goals);
    } else {
      fluctuationText = "ingen funksjon";
    }

    let greatestChangeText;
    let changeValue;
    if (
      this.props.greatestChange !== "none" &&
      this.props.dataType !== BLOODSUGAR
    ) {
      [greatestChangeText, changeValue] = this.props.greatestChange(
        view,
        aggregatedData,
        goals
      );
    } else if (this.props.dataType === BLOODSUGAR) {
      fluctuationText =
        "Den største reduksjonen i gjennomsnittlig blodsukker skjedde fra onsdag til torsdag.";
      greatestChangeText = "Du hadde mest svingninger i blodsukker på mandag.";
    } else {
      greatestChangeText = "ingen funksjon";
    }

    let goal = getGoal(this.props.patient, this.props.dataType).value;
    let pic = triangleDownPic;
    if (this.props.triangle === "squiggly") {
      pic = squigglyLinePic;
    } else if (changeValue !== undefined) {
      if (changeValue.y >= goal) {
        pic = triangleUpPic;
      }
    }

    if (
      (this.props.greatestChange !== "none" &&
        this.props.fluctuation !== "none") ||
      this.props.dataType !== BLOODSUGAR
    ) {
      return (
        <div>
          <div className="flex-container-pattern">
            <div className="flex-children-pattern-image">
              <img src={pic} alt={"logo"} className="arrow-icon" />
            </div>
            <div
              className="flex-children-pattern-text"
              style={{ color: "black" }}
            >
              {greatestChangeText}
            </div>
          </div>
          <br />
          <div className="flex-container-pattern">
            <div className="flex-children-pattern-image">
              <img
                src={squigglyLinePic}
                alt={"logo"}
                className="squiggly-icon"
              />
            </div>
            <div className="flex-children-pattern-text">
              <div style={{ color: "black" }}>{fluctuationText}</div>
            </div>
          </div>
          <div />
        </div>
      );
    } else if (this.props.greatestChange !== "none") {
      return (
        <div>
          <div className="flex-container-pattern">
            <div className="flex-children-pattern-image">
              <img src={pic} alt={"logo"} className="arrow-icon" />
            </div>
            <div
              className="flex-children-pattern-text"
              style={{ color: "black" }}
            >
              {greatestChangeText}
            </div>
          </div>
        </div>
      );
    } else if (this.props.fluctuation !== "none") {
      return (
        <div>
          <div className="flex-container-pattern">
            <div className="flex-children-pattern-image">
              <img
                src={squigglyLinePic}
                alt={"logo"}
                className="squiggly-icon"
              />
            </div>
            <div
              className="flex-children-pattern-text"
              style={{ color: "black" }}
            >
              {fluctuationText}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <CardComponent title="Mønster" content={this.patternCardContent()} />
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(PatternCard);
