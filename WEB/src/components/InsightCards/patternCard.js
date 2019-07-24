import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import "./patternCard.css";

class PatternCard extends Component {
  patternCardContent = () => {
    const squigglyLinePic = require("../../Images/squigglyPatternIcon.svg");
    let interval = this.props.interval;
    let data = this.props.data;

    let [startPeriod, endPeriod, amount] = this.props.greatestChange(
      interval,
      data
    );
    let [start, end] = this.props.fluctuation(interval, data);

    return (
      <div>
        <div className="flex-container-pattern">
          <div className="flex-children-pattern-image">
            <img
              src={this.props.trianglePic}
              alt={"logo"}
              className="arrow-icon"
            />
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
    console.log(this.props.data);
    return (
      <CardComponent title="Mønster" content={this.patternCardContent()} />
    );
  }
}

export default PatternCard;
