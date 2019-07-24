import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import "./patternCard.css";

class PatternCard extends Component {
  patternCardContent = () => {
    const squigglyLinePic = require("../../Images/squigglyPatternIcon.svg");
    const downTrianglePic = require("../../Images/pinkDownTriangle.svg");
    return (
      <div>
        <div className="flex-container-pattern">
          <div className="flex-children-pattern-image">
            <img src={downTrianglePic} alt={"logo"} className="arrow-icon" />
          </div>
          <div className="flex-children-pattern-text">
            Du hadde sjukt mye reduksjon i blodsukkeret i januar
          </div>
        </div>
        <br />
        <div className="flex-container-pattern">
          <div className="flex-children-pattern-image">
            <img src={squigglyLinePic} alt={"logo"} className="squiggly-icon" />
          </div>
          <div className="flex-children-pattern-text">
            Masse svingninger i blodsukkeret på lørdager, slutt å spise så mye
            pizza og godteri
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
