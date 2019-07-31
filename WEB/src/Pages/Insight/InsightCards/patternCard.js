import React, { Component } from "react";
import CardComponent from "../../../components/Card/cardComponent";
import "./patternCard.css";
import {
  getRawDataForDataType,
  getAggregatedDataForDataType
} from "../../../Utils/aggregatedDataForDataType";
import { connect } from "react-redux";
import { getGoal } from "../../../dataTypes";

class PatternCard extends Component {
  patternCardContent = () => {
    const squigglyLinePic = require("../../../Images/squigglyPatternIcon.svg");
    const triangleUpPic = require("../../../Images/pinkUpTriangle.svg");
    const triangleDownPic = require("../../../Images/pinkDownTriangle.svg");

    let data = this.props.data;
    let view = this.props.view;
    let goals = this.props.goals;

    const aggregatedData = getRawDataForDataType(
      this.props.baseInfo,
      this.props.patient.datasets,
      this.props.dataType,
      "insight"
    );
    let fluctuationText;
    let fluctuationValue;
    if (this.props.fluctuation !== "none") {
      fluctuationText = this.props.fluctuation(view, aggregatedData, goals);
    } else {
      fluctuationText = "ingen funksjon";
    }
    let greatestChangeText;
    let changeValue;
    if (this.props.greatestChange !== "none") {
      [greatestChangeText, changeValue] = this.props.greatestChange(
        view,
        aggregatedData,
        goals
      );
    } else {
      greatestChangeText = "ingen funksjon";
    }

    let goal = getGoal(this.props.patient, this.props.dataType).value;
    let pic = triangleDownPic;
    if (this.props.triangle === "squiggly") {
      pic = squigglyLinePic;
    } else if (changeValue.y >= goal) {
      pic = triangleUpPic;
    }

    if (
      this.props.greatestChange !== "none" &&
      this.props.fluctuation !== "none"
    ) {
      return (
        <div>
          <div className="flex-container-pattern">
            <div className="flex-children-pattern-image">
              <img src={pic} alt={"logo"} className="arrow-icon" />
            </div>
            <div className="flex-children-pattern-text">
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
              <div>{fluctuationText}</div>
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
            <div className="flex-children-pattern-text">
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
            <div className="flex-children-pattern-text">{fluctuationText}</div>
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
