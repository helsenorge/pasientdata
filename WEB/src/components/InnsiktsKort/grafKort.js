import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";

class Oversiktkort extends Component {
  render() {
    return <CardComponent title="Graf" content={this.props.datatype} />;
  }
}

export default Oversiktkort;
