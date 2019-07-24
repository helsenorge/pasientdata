import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import DateDropdown from "../DateDropdown/dateDropdown";
import "./insightCards.css";

class ViewCard extends Component {
  state = { view: "To uker" };

  makeContent = () => {
    return (
      <span className="view-parent">
        <span className="view-div">Viser siste</span>
        <span className="view-child">
          <DateDropdown name={this.state.view} />
        </span>
      </span>
    );
  };

  render() {
    return <CardComponent content={this.makeContent()} />;
  }
}

export default ViewCard;
