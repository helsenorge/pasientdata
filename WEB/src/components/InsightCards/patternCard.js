import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import "./patternCard.css";

class PatternCard extends Component {
  patternCardContent = () => {
    const squigglyLinePic = require("../../Images/squigglyPatternIcon.svg");
    const triangleUpPic = require("../../Images/pinkUpTriangle.svg");
    const triangleDownPic = require("../../Images/pinkDownTriangle.svg");

    let interval = this.props.interval;
    let data = this.props.data;
    let view = this.props.view;
    let goals = this.props.goals;

    let [startPeriod, endPeriod, amount] = this.props.greatestChange(
      interval,
      data,
      view,
      goals
    );
    let [start, end] = this.props.fluctuation(interval, data, view, goals);

    let pic = triangleDownPic;
    if (this.props.triangle === "up") {
      pic = triangleUpPic;
    }

    return (
      <div>
        <div className="flex-container-pattern">
          <div className="flex-children-pattern-image">
            <img src={pic} alt={"logo"} className="arrow-icon" />
          </div>
          <div className="flex-children-pattern-text">
            {"Fra " +
              startPeriod +
              " to " +
              endPeriod +
              " skjedde den største økningen i tid innom grenseverdiene, med en økning på " +
              amount +
              "%"}
          </div>
        </div>
        <br />
        <div className="flex-container-pattern">
          <div className="flex-children-pattern-image">
            <img src={squigglyLinePic} alt={"logo"} className="squiggly-icon" />
          </div>
          <div className="flex-children-pattern-text">
            {"Mest svingninger i blodsukkeret mellom " +
              start +
              " og " +
              end +
              " denne dagen."}
          </div>
        </div>
        <div />
      </div>
    );
  };

  render() {
    return (
      <CardComponent title="Mønster" content={this.patternCardContent()} />
    );
  }
}

export default PatternCard;
