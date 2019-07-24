import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";

class PatternCard extends Component {
  patternCardContent = () => {};

  render() {
    return (
      <CardComponent title="Mønster" content={this.patternCardContent()} />
    );
  }
}

export default PatternCard;
