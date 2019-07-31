import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import "./patternCard.css";

class PatternCard extends Component {
  patternCardContent = () => {
    const squigglyLinePic = require("../../Images/squigglyPatternIcon.svg");
    const triangleUpPic = require("../../Images/pinkUpTriangle.svg");
    const triangleDownPic = require("../../Images/pinkDownTriangle.svg");

    let data = this.props.data;
    let view = this.props.view;
    let goals = this.props.goals;

    let fluctuationText;
    if (this.props.fluctuation !== "none") {
      fluctuationText = this.props.fluctuation(view, data, goals);
    } else {
      fluctuationText = "ingen funksjon";
    }

    let greatestChangeText;
    if (this.props.greatestChange !== "none") {
      greatestChangeText = this.props.greatestChange(view, data, goals);
    } else {
      greatestChangeText = "ingen funksjon";
    }

    let pic = triangleDownPic;
    if (this.props.triangle === "up") {
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
      // } else if (this.props.fluctuation !== "none") {
      //   <div>
      //     <div className="flex-container-pattern">
      //       <div className="flex-children-pattern-image">
      //         <img src={squigglyLinePic} alt={"logo"} className="squiggly-icon" />
      //       </div>
      //       <div className="flex-children-pattern-text">{fluctuationText}</div>
      //     </div>
      // </div>;
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

export default PatternCard;
