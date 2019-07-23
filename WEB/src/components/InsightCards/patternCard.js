import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";

class PatternCard extends Component {
  render() {
    return <CardComponent title="Mønster" content={this.props.datatype} />;
  }
}

export default PatternCard;
