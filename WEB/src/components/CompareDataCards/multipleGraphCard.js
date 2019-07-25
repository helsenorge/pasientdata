import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";

class MultipleGraphCard extends Component {
  makeContent = () => {
    return <div>masse grafer</div>;
  };
  render() {
    return <CardComponent title={"Over tid"} content={this.makeContent()} />;
  }
}

export default MultipleGraphCard;
